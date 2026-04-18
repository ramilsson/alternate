import Fastify, { fastify, type FastifyServerOptions } from 'fastify';
import cors from '@fastify/cors';
import database from './database/index.js';
import { project } from './project/index.js';
import { collection } from './collection/index.js';
import { resource } from './resource/index.js';
import { storage, type StorageOptions } from './storage/index.js';

interface Options {
  serverOptions?: FastifyServerOptions;
  minioOptions?: StorageOptions['minioOptions'];
}

export const buildServer = (options: Options) => {
  const { serverOptions, minioOptions } = options;

  const fastifyServer = Fastify(serverOptions);

  fastifyServer.register(cors, {
    origin: true,
    methods: 'GET,HEAD,POST,PATCH,PUT,DELETE',
  });

  fastifyServer.register(database);

  fastifyServer.register(project);
  fastifyServer.register(collection);
  fastifyServer.register(resource);

  if (minioOptions) {
    fastifyServer.register(storage, { minioOptions });
  }

  return fastifyServer;
};
