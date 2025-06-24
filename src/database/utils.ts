import { PrismaClient } from '@prisma/client';
import { resourceModelExtension } from './extensions';

export function createExtendedPrismaClient() {
  return new PrismaClient().$extends(resourceModelExtension);
}
