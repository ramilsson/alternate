import type { FastifyInstance } from 'fastify';
import type { Collection, Prisma, Project, Resource } from '@prisma/client';
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
  collectionFactory: {
    /**
     * Creates and returns a new collection
     * @param data - Collection data, defaults to fixture data
     * @returns The created collection
     */
    createCollection: (data?: Prisma.CollectionCreateInput) => Promise<Collection>;
  };

  oneResource: Resource;
  manyResources: Resource[];
  resourceFactory: {
    /**
     * Creates a new resource in the specified collection
     * @param collection - The collection to create the resource in
     * @param payload - Resource payload. Defaults to fixture payload
     * @returns The created resource
     */
    createResource: (collection: Collection, payload?: Resource['payload']) => Promise<Resource>;
  };

  minioClient: MinioClient;
  bucketName: string;
  oneFile: File;
  oneObject: Object;

  objectFactory: {
    /**
     * Creates a new object using the `oneFile` fixture for the specified resource
     * @param resource - The resource to create the object in
     * @returns The created object
     */
    createObject: (resource: Resource) => Promise<Object>;
  };
}
