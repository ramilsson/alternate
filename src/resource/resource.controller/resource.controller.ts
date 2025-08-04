import { type FastifyPluginAsync } from 'fastify';
import qs from 'qs';

import {
  resourceListReadSchema,
  resourceCreateSchema,
  resourceUpdateSchema,
} from './schema';

import type {
  ResourceCreateSchema,
  ResourceUpdateSchema,
  ResourceListReadSchema,
} from './types';

import { isValidResourceWhereInput } from './utils';
import { INVALID_WHERE_PARAMETER_MESSAGE } from './const';

export const resourceController: FastifyPluginAsync = async (fastify) => {
  fastify.route<ResourceListReadSchema>({
    url: '/resource',
    method: 'GET',
    schema: resourceListReadSchema,
    handler: async (request, reply) => {
      const parsedQuery = qs.parse(request.query, { comma: true });

      if (!isValidResourceWhereInput(parsedQuery.where)) {
        return reply.code(400).send(new Error(INVALID_WHERE_PARAMETER_MESSAGE));
      }

      const resourceFindManyAndPopulateParams = {
        collectionId: request.query.collectionId,
        populate: request.query.populate?.split(',') || [],
        where: parsedQuery.where,
      };

      return await fastify.database.resource.findManyAndPopulate(
        resourceFindManyAndPopulateParams
      );
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
          payload: request.body.payload,
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
        data: {
          payload: request.body.payload,
        },
      });

      return reply.code(200).send(updatedResource);
    },
  });
};
