import Fastify, { type FastifyServerOptions } from 'fastify';
import prisma from './prisma';

export const buildServer = (options?: FastifyServerOptions) => {
  const fastifyServer = Fastify(options);

  fastifyServer.register(prisma);

  return fastifyServer;
};
