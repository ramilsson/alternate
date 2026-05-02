import {
  collectionReadSchema,
  collectionListReadSchema,
  collectionCreateSchema,
} from './schema.js';

import type { FastifyPluginAsync } from 'fastify';
import type {
  CollectionReadSchema,
  CollectionListReadSchema,
  CollectionCreateSchema,
} from './types.js';

export const collectionController: FastifyPluginAsync = async (fastify) => {
  fastify.route<CollectionReadSchema>({
    url: '/collection/:id',
    method: 'GET',
    schema: collectionReadSchema,
    handler: async (request) => {
      return await fastify.database.collection.findUniqueOrThrow({
        where: { id: request.params.id },
      });
    },
  });

  fastify.route<CollectionListReadSchema>({
    url: '/collection',
    method: 'GET',
    schema: collectionListReadSchema,
    handler: async (request) => {
      return await fastify.database.collection.findMany({
        where: { projectId: request.query.projectId },
      });
    },
  });

  fastify.route<CollectionCreateSchema>({
    url: '/collection',
    method: 'POST',
    schema: collectionCreateSchema,
    handler: async (request, reply) => {
      const createdCollection = await fastify.database.collection.create({
        data: { name: request.body.name, projectId: request.body.projectId },
      });

      return reply.code(201).send(createdCollection);
    },
  });
};
