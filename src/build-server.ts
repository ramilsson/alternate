import Fastify, { type FastifyServerOptions } from 'fastify';
import database from './database';

export const buildServer = (options?: FastifyServerOptions) => {
  const fastifyServer = Fastify(options);

  fastifyServer.register(database);

  return fastifyServer;
};
