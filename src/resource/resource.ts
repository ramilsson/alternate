import type { FastifyPluginAsync } from 'fastify';
import { resourceController } from './resource-controller/index.js';
import { resourceService } from './resource-service/index.js';

export const resource: FastifyPluginAsync = async (fastify) => {
  await fastify.register(resourceService);

  fastify.register(resourceController, {
    resourceService: fastify.resourceService,
  });
};
