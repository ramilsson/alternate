import type { FastifyInstance } from 'fastify';
import type { Project } from '@prisma/client';

export interface Fixtures {
  server: FastifyInstance;

  oneProject: Project;
  manyProjects: Project[];
}
