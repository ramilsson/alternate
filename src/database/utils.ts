import { PrismaClient } from '@prisma/client';
import { objectExtension } from './extensions/index.js';
import { resourceModelExtension } from './extensions.js';

export function createExtendedPrismaClient() {
  return new PrismaClient().$extends(objectExtension).$extends(resourceModelExtension);
}
