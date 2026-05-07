import { PrismaClient } from '@prisma/client';
import { resourceModelExtension } from './extensions.js';
import { objectExtension } from './extensions/index.js';

export function createExtendedPrismaClient() {
  return new PrismaClient().$extends(objectExtension).$extends(resourceModelExtension);
}
