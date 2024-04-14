import fastifyPlugin from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

import type { FastifyPluginAsync } from 'fastify';

const prisma: FastifyPluginAsync = async (fastify) => {
  const prismaClient = new PrismaClient();

  await prismaClient.$connect();

  fastify.addHook('onClose', async (fastify) => {
    await fastify.prisma.$disconnect();
  });

  fastify.decorate('prisma', prismaClient);
};

export default fastifyPlugin(prisma);
