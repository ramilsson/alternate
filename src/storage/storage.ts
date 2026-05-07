import type { FastifyPluginAsync } from 'fastify';

import { objectService } from './object-service/index.js';

import {
  type ObjectCreateSchema,
  type ObjectListReadSchema,
  type ObjectUpdateSchema,
  objectCreateSchema,
  objectListReadSchema,
  objectUpdateSchema,
} from './schema.js';

export const storage: FastifyPluginAsync = async (fastify) => {
  fastify.register(objectService);

  fastify.route<ObjectListReadSchema>({
    method: 'GET',
    url: '/object',
    schema: objectListReadSchema,
    handler: async (request, reply) => {
      return await fastify.objectService.readObjectList(request.query.resourceId);
    },
  });

  fastify.route<ObjectCreateSchema>({
    url: '/object',
    method: 'POST',
    schema: objectCreateSchema,
    handler: async (request, reply) => {
      const createdObject = await fastify.objectService.createObject(request.body);

      return reply.code(201).send(createdObject);
    },
  });

  fastify.route<ObjectUpdateSchema>({
    url: '/object/:id',
    method: 'PATCH',
    schema: objectUpdateSchema,
    handler: async (request) => {
      return await fastify.objectService.updateObject(request.params.id, request.body);
    },
  });
};
