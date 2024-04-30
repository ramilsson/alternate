import { type FastifyPluginAsync } from 'fastify';
import { projectController } from './project.controller';

export const project: FastifyPluginAsync = async (fastify) => {
  fastify.register(projectController);
};
