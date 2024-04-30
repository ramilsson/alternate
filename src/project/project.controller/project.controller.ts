import { Prisma } from '@prisma/client';
import { projectCreateSchema } from './schema';

import type { FastifyPluginAsync } from 'fastify';
import type { ProjectCreateSchema } from './types';

export const projectController: FastifyPluginAsync = async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    const DEFAULT_STATUS_CODE = 500;

    const statusCodeByPrismaErrorCode: Record<string, number | undefined> = {
      P2002: 400,
    };

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const statusCode =
        statusCodeByPrismaErrorCode[error.code] || DEFAULT_STATUS_CODE;

      return reply.code(statusCode).send(error.message);
    }

    throw error;
  });

  fastify.route({
    url: '/project',
    method: 'GET',
    handler: async () => {
      return await fastify.database.project.findMany();
    },
  });

  fastify.route<ProjectCreateSchema>({
    url: '/project',
    method: 'POST',
    schema: projectCreateSchema,
    handler: async (request, reply) => {
      const createdProject = await fastify.database.project.create({
        data: { name: request.body.name },
      });

      return reply.code(201).send(createdProject);
    },
  });
};
