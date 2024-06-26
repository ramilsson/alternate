import Fastify, { type FastifyServerOptions } from 'fastify';
import cors from '@fastify/cors';
import database from './database';
import { project } from './project';
import { collection } from './collection';
import { resource } from './resource';

export const buildServer = (options?: FastifyServerOptions) => {
  const fastifyServer = Fastify(options);

  fastifyServer.register(cors, {
    origin: true,
    credentials: true,
  });

  fastifyServer.register(database);

  fastifyServer.register(project);
  fastifyServer.register(collection);
  fastifyServer.register(resource);

  return fastifyServer;
};
