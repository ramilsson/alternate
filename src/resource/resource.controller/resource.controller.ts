import { resourceListReadSchema, resourceCreateSchema } from './schema';

import type { FastifyPluginAsync } from 'fastify';
import type { ResourceCreateSchema, ResourceListReadSchema } from './types';

export const resourceController: FastifyPluginAsync = async (fastify) => {
  fastify.route<ResourceListReadSchema>({
    url: '/resource',
    method: 'GET',
    schema: resourceListReadSchema,
    handler: async (request) => {
      return await fastify.database.resource.findMany({
        where: { collectionId: request.query.collectionId },
      });
    },
  });

  fastify.route<ResourceCreateSchema>({
    url: '/resource',
    method: 'POST',
    schema: resourceCreateSchema,
    handler: async (request, reply) => {
      const createdResource = await fastify.database.resource.create({
        data: {
          collectionId: request.body.collectionId,
          fields: request.body.fields,
        },
      });

      return reply.code(201).send(createdResource);
    },
  });
};
