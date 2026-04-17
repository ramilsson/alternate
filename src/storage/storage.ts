import { type FastifyPluginAsync } from 'fastify';
import * as Minio from 'minio';

import { objectService } from './object-service/index.js';

import {
  objectCreateSchema,
  ObjectCreateSchema,
  objectListReadSchema,
  ObjectListReadSchema,
  objectUpdateSchema,
  ObjectUpdateSchema,
} from './schema.js';

import { StorageOptions } from './types.js';

export const storage: FastifyPluginAsync<StorageOptions> = async (
  fastify,
  options,
) => {
  const { minioOptions } = options;

  const minioClient = new Minio.Client({
    endPoint: minioOptions.host,
    port: minioOptions.port,
    useSSL: minioOptions.useSSL,
    accessKey: minioOptions.accessKey,
    secretKey: minioOptions.secretKey,
  });

  const bucketName = minioOptions.bucketName;

  fastify.register(objectService, { minioClient, bucketName });

  fastify.route<ObjectListReadSchema>({
    method: 'GET',
    url: '/object',
    schema: objectListReadSchema,
    handler: async (request, reply) => {
      return await fastify.objectService.readObjectList(
        request.query.resourceId,
      );
    },
  });

  fastify.route<ObjectCreateSchema>({
    url: '/object',
    method: 'POST',
    schema: objectCreateSchema,
    handler: async (request, reply) => {
      const createdObject = await fastify.objectService.createObject(
        request.body.resourceId,
        request.body,
      );

      return reply.code(201).send(createdObject);
    },
  });

  fastify.route<ObjectUpdateSchema>({
    url: '/object/:id',
    method: 'PATCH',
    schema: objectUpdateSchema,
    handler: async (request) => {
      return await fastify.objectService.updateObject(
        request.params.id,
        request.body,
      );
    },
  });
};
