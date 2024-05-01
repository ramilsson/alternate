import { type FastifyPluginAsync } from 'fastify';
import { resourceController } from './resource.controller';

export const resource: FastifyPluginAsync = async (fastify) => {
  fastify.register(resourceController);
};
