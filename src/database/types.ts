import { Prisma } from '@prisma/client';
import { createExtendedPrismaClient } from './utils';

export interface ResourceFindManyAndPopulateParams {
  collectionId: string;
  populate?: string[];
  where?: Omit<Prisma.ResourceWhereInput, 'collection' | 'collectionId'>;
}

export type PrismaClientExtended = ReturnType<
  typeof createExtendedPrismaClient
>;
