export { default as objectService } from './object-service.js';
import type { ObjectService } from './types.js';

declare module 'fastify' {
  interface FastifyInstance {
    objectService: ObjectService;
  }
}

export type { ObjectService };
