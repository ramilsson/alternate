import { createExtendedPrismaClient } from './utils';

export type PrismaClientExtended = ReturnType<
  typeof createExtendedPrismaClient
>;
