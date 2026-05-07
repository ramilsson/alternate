#!/usr/bin/env -S npx tsx

/**
 * @file This file contains an one-off task that converts resource `attributes` to `payload`.
 */

import { PrismaClient } from '@prisma/client';
import { validate } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const resources = await prisma.resource.findMany();

  const resourceRelationsToCreate: {
    name: string;
    resourceId: string;
    targetResourceId: string;
  }[] = [];

  resources.forEach((resource) => {
    Object.entries(resource.payload).forEach(([property, value]) => {
      if (typeof value === 'string' && validate(value)) {
        resourceRelationsToCreate.push({
          name: property,
          resourceId: resource.id,
          targetResourceId: value,
        });
      }
    });
  });

  await prisma.resourceRelation.createMany({
    data: resourceRelationsToCreate,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
