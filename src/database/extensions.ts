import { Resource, Prisma } from '@prisma/client';

export const resourceModelExtension = Prisma.defineExtension((client) => {
  const getRelatedResourceIds = (
    resources: Resource[],
    payloadKeys: string[]
  ) => {
    const relatedResourceIds = resources.reduce((acc, resource) => {
      const payload = resource.payload;

      payloadKeys.forEach((key) => {
        if (key in payload && typeof payload[key] === 'string') {
          acc.add(payload[key]);
        }
      });

      return acc;
    }, new Set<string>());

    return Array.from(relatedResourceIds);
  };

  return client.$extends({
    model: {
      resource: {
        async findManyWithRelated(
          collectionId: string,
          payloadKeys?: string[]
        ): Promise<Resource[]> {
          const resources = await client.resource.findMany({
            where: { collectionId: collectionId },
          });

          if (!payloadKeys || !payloadKeys.length) return resources;

          const relatedResourceIds = getRelatedResourceIds(
            resources,
            payloadKeys
          );

          if (!relatedResourceIds.length) return resources;

          const relatedResources = await client.resource.findMany({
            where: { id: { in: relatedResourceIds } },
          });

          return resources.map((resource) => {
            payloadKeys.forEach((key) => {
              resource.payload[key] =
                relatedResources.find((r) => r.id === resource.payload[key]) ||
                null;
            });

            return resource;
          });
        },
      },
    },
  });
});
