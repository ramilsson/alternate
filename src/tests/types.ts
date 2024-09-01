import type { FastifyInstance } from 'fastify';
import type { Collection, Project, Resource } from '@prisma/client';
import { ResourceWithAttributes } from '../resource';

export interface Fixtures {
  server: FastifyInstance;

  oneProject: Project;
  manyProjects: Project[];

  oneCollection: Collection;
  manyCollections: Collection[];

  oneResource: ResourceWithAttributes;
  manyResources: Resource[];
}
