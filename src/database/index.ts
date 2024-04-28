import type { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    database: PrismaClient;
  }
}

export { default } from './database';
