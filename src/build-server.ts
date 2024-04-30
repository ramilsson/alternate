import Fastify, { type FastifyServerOptions } from 'fastify';
import database from './database';
import { project } from './project';

export const buildServer = (options?: FastifyServerOptions) => {
  const fastifyServer = Fastify(options);

  fastifyServer.register(database);
  fastifyServer.register(project);

  return fastifyServer;
};
