#!/usr/bin/env -S npx tsx

// @ts-nocheck ("Resource" model doesnt have "attributes" anymore)

/**
 * @file This file contains an one-off task that converts resource `attributes` to `payload`.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const resources = await prisma.resource.findMany({
    include: { attributes: true },
  });

  await prisma.$transaction(
    resources.map((resource) => {
      const payload = resource.attributes.reduce<Record<string, unknown>>(
        (acc, attribute) => {
          const value = (() => {
            if (!attribute.value) {
              return null;
            } else if (attribute.type === 'LITERAL_NUMBER') {
              return Number(attribute.value);
            } else if (attribute.type === 'LITERAL_BOOLEAN') {
              return Boolean(Number(attribute.value));
            } else if (attribute.type === 'LITERAL_JSON') {
              return JSON.parse(attribute.value);
            } else {
              return String(attribute.value);
            }
          })();

          acc[attribute.name] = value;
          return acc;
        },
        {}
      );

      return prisma.resource.update({
        where: { id: resource.id },
        data: { payload: payload },
      });
    })
  );
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
