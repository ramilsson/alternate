import path from 'node:path';
import type { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import type { Extension, ExtensionsPlugin } from './types.js';

const extensionsPlugin: FastifyPluginAsync = async (fastify) => {
  const loadExtensions = async () => {
    const extensionsFile = process.env.EXTENSIONS ? path.resolve(process.cwd(), process.env.EXTENSIONS) : null;

    if (!extensionsFile) return null;

    try {
      const extensions: Extension[] = (await import(extensionsFile)).default;

      console.info('Extensions loaded:', extensions.map((e) => e.name).join());

      return extensions;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const extensions = await loadExtensions();

  const getExtensions: ExtensionsPlugin['getExtensions'] = (collection) => {
    if (!extensions || !collection.schema) return null;

    return extensions.filter((extension) => {
      return collection.schema?.['x-extensions']?.includes(extension.name);
    });
  };

  fastify.decorate<ExtensionsPlugin>('extensions', { getExtensions });
};

export default fastifyPlugin(extensionsPlugin);
