import type { FastifyInstance } from 'fastify';
import type { Collection, Project, Resource } from '@prisma/client';
import type { Client as MinioClient } from 'minio';
import type { Object } from '../database/types.js';

interface File {
  name: string;
  content: Blob | string;
}

export interface Fixtures {
  server: FastifyInstance;

  oneProject: Project;
  manyProjects: Project[];

  oneCollection: Collection;
  manyCollections: Collection[];

  oneResource: Resource;
  manyResources: Resource[];

  minioClient: MinioClient;
  bucketName: string;
  oneFile: File;
  oneObject: Object;
}
