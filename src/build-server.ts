import Fastify, { type FastifyServerOptions } from 'fastify';
import cors from '@fastify/cors';
import database from './database/index.js';
import { project } from './project/index.js';
import { collection } from './collection/index.js';
import { resource } from './resource/index.js';
import { storage } from './storage/index.js';

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
  fastifyServer.register(storage);

  return fastifyServer;
};
