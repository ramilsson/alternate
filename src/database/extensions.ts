import { Resource, Prisma } from '@prisma/client';
import { validate } from 'uuid';

export const resourceModelExtension = Prisma.defineExtension((client) => {
  const getRelatedResourceIds = (
    resources: Resource[],
    payloadKeys: string[]
  ) => {
    const relatedResourceIds = resources.reduce((acc, resource) => {
      const payload = resource.payload;

      payloadKeys.forEach((key) => {
        if (key in payload && validate(payload[key])) {
          acc.add(String(payload[key]));
        }
      });

      return acc;
    }, new Set<string>());

    return Array.from(relatedResourceIds);
  };

  return client.$extends({
    model: {
      resource: {
        async findManyAndPopulate(
          collectionId: string,
          populate?: string
        ): Promise<Resource[]> {
          const resources = await client.resource.findMany({
            where: { collectionId: collectionId },
          });

          const keysToPopulate = populate?.split(',');

          if (!keysToPopulate || !keysToPopulate.length) return resources;

          const relatedResourceIds = getRelatedResourceIds(
            resources,
            keysToPopulate
          );

          if (!relatedResourceIds.length) return resources;

          const relatedResources = await client.resource.findMany({
            where: { id: { in: relatedResourceIds } },
          });

          return resources.map((resource) => {
            keysToPopulate.forEach((key) => {
              const relatedResource = relatedResources.find(
                (r) => r.id === resource.payload[key]
              );

              if (relatedResource) resource.payload[key] = relatedResource;
            });

            return resource;
          });
        },
      },
    },
  });
});
