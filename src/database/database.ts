import fastifyPlugin from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';

import { createExtendedPrismaClient } from './utils';

/**
 * @TODO https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
 */
const database: FastifyPluginAsync = async (fastify) => {
  const prismaClient = createExtendedPrismaClient();

  fastify.addHook('onClose', async () => {
    try {
      await prismaClient.$disconnect();
    } catch (error) {
      console.error(error);
    }
  });

  fastify.decorate<typeof prismaClient>('database', prismaClient);
};

export default fastifyPlugin(database);
