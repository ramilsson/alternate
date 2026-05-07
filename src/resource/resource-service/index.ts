export { default as resourceService } from './resource-service.js';

import type { ResourceService } from './types.js';

declare module 'fastify' {
  interface FastifyInstance {
    resourceService: ResourceService;
  }
}

export type { ResourceService };
