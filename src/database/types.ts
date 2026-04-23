import type { Prisma, Resource, Object as BaseObject } from '@prisma/client';
import { createExtendedPrismaClient } from './utils.js';

export interface ResourceFindManyAndPopulateParams {
  collectionId: string;
  populate?: string[];
  where?: Omit<Prisma.ResourceWhereInput, 'collection' | 'collectionId'>;
  include?: Pick<Prisma.ResourceInclude, 'objects'>;
}

export type PrismaClientExtended = ReturnType<
  typeof createExtendedPrismaClient
>;

export type { Resource };

export interface Object extends BaseObject {
  name: string;
}

export interface ResourceWithObjects extends Resource {
  objects: Object[];
}
