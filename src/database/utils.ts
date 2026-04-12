import { PrismaClient } from '@prisma/client';
import { resourceModelExtension } from './extensions.js';

export function createExtendedPrismaClient() {
  return new PrismaClient().$extends(resourceModelExtension);
}
