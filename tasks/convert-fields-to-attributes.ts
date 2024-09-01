#!/usr/bin/env -S npx tsx

import { PrismaClient, Prisma, AttributeType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const resources = await prisma.resource.findMany();

  const attributesToCreate = resources.reduce<
    Prisma.AttributeCreateManyInput[]
  >((acc, resource) => {
    const attributesToCreate = resource.fields.map((field) => {
      let attributeType: AttributeType = AttributeType.LITERAL_STRING;

      if (typeof field.value === 'number') {
        attributeType = AttributeType.LITERAL_NUMBER;
      } else if (typeof field.value === 'boolean') {
        attributeType = AttributeType.LITERAL_BOOLEAN;
      } else if (typeof field.value === 'object') {
        attributeType = AttributeType.LITERAL_JSON;
      }

      const value =
        attributeType === AttributeType.LITERAL_JSON
          ? JSON.stringify(field.value)
          : String(field.value);

      return {
        resourceId: resource.id,
        name: field.key,
        value: value,
        type: attributeType,
      };
    });

    acc.push(...attributesToCreate);
    return acc;
  }, []);

  await prisma.attribute.createMany({ data: attributesToCreate });
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
