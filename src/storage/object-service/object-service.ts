import { type FastifyPluginAsync } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import mime from 'mime';

import { Object as DatabaseObject } from '../../database/types.js';
import { Object, ObjectService } from './types.js';

const objectService: FastifyPluginAsync = async (fastify) => {
  const { client: minioClient, bucketName } = fastify.minio;

  const getPresignedPostPolicy = async (object: DatabaseObject) => {
    const policy = minioClient.newPostPolicy();

    policy.setBucket(bucketName);
    policy.setKey(object.name);
    policy.setContentDisposition(`attachment; filename="${object.fileName}"`);
    policy.setUserMetaData({ resourceId: object.resourceId });

    const contentType = mime.getType(object.fileName);

    if (contentType) {
      policy.setContentType(contentType);
    }

    return await minioClient.presignedPostPolicy(policy);
  };

  const transformObject = async (object: DatabaseObject): Promise<Object> => {
    const url = await minioClient.presignedGetObject(bucketName, object.name);
    const postPolicy = await getPresignedPostPolicy(object);

    return { ...object, url, postPolicy };
  };

  const readObjectList: ObjectService['readObjectList'] = async (
    resourceId,
  ) => {
    const objects = await fastify.database.object.findMany({
      where: { resourceId },
    });

    return Promise.all(objects.map(transformObject));
  };

  const createObject: ObjectService['createObject'] = async (data) => {
    const createdObject = await fastify.database.object.create({ data });

    return await transformObject(createdObject);
  };

  const updateObject: ObjectService['updateObject'] = async (id, data) => {
    const updatedObject = await fastify.database.object.update({
      where: { id },
      data: data,
    });

    return await transformObject(updatedObject);
  };

  fastify.decorate<ObjectService>('objectService', {
    transformObject,
    readObjectList,
    createObject,
    updateObject,
  });
};

export default fastifyPlugin(objectService);
