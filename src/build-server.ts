import Fastify, { type FastifyServerOptions } from 'fastify';

export const buildServer = (options?: FastifyServerOptions) => {
  const fastifyServer = Fastify(options);

  return fastifyServer;
};
