import type { ExtensionsPlugin } from './types.js';

declare module 'fastify' {
  interface FastifyInstance {
    extensions: ExtensionsPlugin;
  }
}

export { default as extensionsPlugin } from './extensions.js';
