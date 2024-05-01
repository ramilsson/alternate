import type { FastifyInstance } from 'fastify';
import type { Collection, Project } from '@prisma/client';

export interface Fixtures {
  server: FastifyInstance;

  oneProject: Project;
  manyProjects: Project[];

  oneCollection: Collection;
  manyCollections: Collection[];
}
