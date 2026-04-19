import type { Minio } from './types.js';

declare module 'fastify' {
  interface FastifyInstance {
    minio: Minio;
  }
}

export { default as minio } from './minio.js';
