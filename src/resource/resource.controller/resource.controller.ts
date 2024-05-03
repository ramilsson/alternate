import {
  resourceListReadSchema,
  resourceCreateSchema,
  resourceUpdateSchema,
} from './schema';

import type { FastifyPluginAsync } from 'fastify';
import type {
  ResourceCreateSchema,
  ResourceUpdateSchema,
  ResourceListReadSchema,
} from './types';

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

  fastify.route<ResourceUpdateSchema>({
    url: '/resource/:id',
    method: 'PATCH',
    schema: resourceUpdateSchema,
    handler: async (request, reply) => {
      const updatedResource = await fastify.database.resource.update({
        where: { id: request.params.id },
        data: { fields: request.body.fields },
      });

      return reply.code(200).send(updatedResource);
    },
  });
};
