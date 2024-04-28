import fastifyPlugin from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

import type { FastifyPluginAsync } from 'fastify';

/**
 * @TODO https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
 */
const database: FastifyPluginAsync = async (fastify) => {
  const prismaClient = new PrismaClient();

  fastify.addHook('onClose', async () => {
    try {
      await prismaClient.$disconnect();
    } catch (error) {
      console.error(error);
    }
  });

  fastify.decorate<PrismaClient>('database', prismaClient);
};

export default fastifyPlugin(database);
