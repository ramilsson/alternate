import { type FastifyPluginAsync } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import { validate as validateGuid } from 'uuid';
import { Ajv } from 'ajv';
import addFormats from 'ajv-formats';

import type { Resource, ResourceService } from './types.js';
import { objectService } from '../../storage/object-service/index.js';

const resourceService: FastifyPluginAsync = async (fastify) => {
  fastify.register(objectService);

  const ajv = new Ajv();

  addFormats.default(ajv);

  const transformResource: ResourceService['transformResource'] = async (
    resource,
  ) => {
    if (!('objects' in resource)) return resource;

    const objects = await Promise.all(
      resource.objects.map(fastify.objectService.transformObject),
    );

    return { ...resource, objects };
  };

  const readResource: ResourceService['readResource'] = async (params) => {
    const resource = await fastify.database.resource.findUniqueOrThrow({
      where: { id: params.resourceId },
      include: params.include,
    });

    if (params.populate?.length) {
      const resourceIdsToPopulate = params.populate
        .map((key) => resource.payload[key])
        .filter(validateGuid) as unknown as string[];

      const resources = await fastify.database.resource.findMany({
        where: { id: { in: resourceIdsToPopulate } },
      });

      const resourcesMap = resources.reduce<Record<Resource['id'], Resource>>(
        (acc, resource) => {
          acc[resource.id] = resource;
          return acc;
        },
        {},
      );

      params.populate.forEach((key) => {
        const value = resource.payload[key];

        resource.payload[key] = resourcesMap[String(value)] || value;
      });
    }

    return await transformResource(resource);
  };

  const readResourceList: ResourceService['readResourceList'] = async (
    params,
  ) => {
    const resources = await fastify.database.resource.findManyAndPopulate({
      collectionId: params.collectionId,
      where: params.where,
      populate: params.populate,
      include: params.include,
    });

    return await Promise.all(resources.map(transformResource));
  };

  const createResource: ResourceService['createResource'] = async (data) => {
    const collection = await fastify.database.collection.findUniqueOrThrow({
      where: { id: data.collectionId },
    });

    if (collection.schema) {
      const validate = ajv.compile(collection.schema);
      const isValidPayload = validate(data.payload);

      if (!isValidPayload) {
        throw validate.errors;
      }
    }

    const createdResource = await fastify.database.resource.create({
      data: data,
    });

    return createdResource;
  };

  const updateResource: ResourceService['updateResource'] = async (
    resourceId,
    data,
  ) => {
    const updatedResource = await fastify.database.resource.update({
      where: { id: resourceId },
      data: data,
    });

    return updatedResource;
  };

  fastify.decorate<ResourceService>('resourceService', {
    transformResource,
    readResource,
    readResourceList,
    createResource,
    updateResource,
  });
};

export default fastifyPlugin(resourceService);
