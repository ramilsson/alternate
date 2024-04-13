import Fastify from 'fastify';
import { fastifyServerOptions } from './settings';

const fastify = Fastify(fastifyServerOptions);

const start = async () => {
  try {
    fastify.listen({
      host: '0.0.0.0',
      port: Number(process.env.PORT) || 5000,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
