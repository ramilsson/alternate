import { PrismaClientExtended } from './types.js';

declare module 'fastify' {
  interface FastifyInstance {
    database: PrismaClientExtended;
  }
}

export { default } from './database.js';
