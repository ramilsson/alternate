import type {
  Prisma,
  Collection,
  Resource,
  Object as BaseObject,
} from '@prisma/client';
import { createExtendedPrismaClient } from './utils.js';

export interface ResourceFindManyAndPopulateParams {
  collectionId: string;
  populate?: string[];
  where?: Omit<Prisma.ResourceWhereInput, 'collection' | 'collectionId'>;
  include?: Pick<Prisma.ResourceInclude, 'objects' | 'outgoingRelations'>;
}

export type PrismaClientExtended = ReturnType<
  typeof createExtendedPrismaClient
>;

export type { Collection, Resource };

export interface Object extends BaseObject {
  name: string;
}

export interface ResourceWithObjects extends Resource {
  objects: Object[];
}

const resourceWithOutgoingRelations = {
  include: { outgoingRelations: { include: { targetResource: true } } },
} satisfies Prisma.ResourceDefaultArgs;

export type ResourceWithOutgoingRelations = Prisma.ResourceGetPayload<
  typeof resourceWithOutgoingRelations
>;
