import { PrismaClientExtended } from './types';

declare module 'fastify' {
  interface FastifyInstance {
    database: PrismaClientExtended;
  }
}

export { default } from './database';
