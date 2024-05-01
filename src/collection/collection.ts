import { type FastifyPluginAsync } from 'fastify';
import { collectionController } from './collection.controller';

export const collection: FastifyPluginAsync = async (fastify) => {
  fastify.register(collectionController);
};
