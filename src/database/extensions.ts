import { Resource, Prisma } from '@prisma/client';
import { validate } from 'uuid';
import { ResourceFindManyAndPopulateParams } from './types';

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
          params: ResourceFindManyAndPopulateParams
        ): Promise<Resource[]> {
          const { collectionId, populate, where } = params;

          const resources = await client.resource.findMany({
            where: { ...where, collectionId: collectionId },
          });

          if (!populate || !populate.length) return resources;

          const relatedResourceIds = getRelatedResourceIds(resources, populate);

          if (!relatedResourceIds.length) return resources;

          const relatedResources = await client.resource.findMany({
            where: { id: { in: relatedResourceIds } },
          });

          return resources.map((resource) => {
            populate.forEach((key) => {
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
