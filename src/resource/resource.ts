import { type FastifyPluginAsync } from 'fastify';
import { resourceController } from './resource.controller/index.js';

export const resource: FastifyPluginAsync = async (fastify) => {
  fastify.register(resourceController);
};
