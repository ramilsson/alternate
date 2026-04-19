import { type FastifyPluginAsync } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import { validate as validateGuid } from 'uuid';

import type {
  Resource,
  ResourceService,
  ResourceServiceOptions,
} from './types.js';

const resourceService: FastifyPluginAsync<ResourceServiceOptions> = async (
  fastify,
) => {
  const readResource: ResourceService['readResource'] = async (params) => {
    const resource = await fastify.database.resource.findUniqueOrThrow({
      where: { id: params.resourceId },
    });

    if (params.populate?.length) {
      const resourceIdsToPopulate = params.populate
        .map((key) => resource.payload[key])
        .filter(validateGuid) as unknown as string[];

      const resources = await fastify.database.resource.findMany({
        where: { id: { in: resourceIdsToPopulate } },
      });

      const resourcesMap = resources.reduce<Record<Resource['id'], Resource>>(
        (acc, resource) => {
          acc[resource.id] = resource;
          return acc;
        },
        {},
      );

      params.populate.forEach((key) => {
        const value = resource.payload[key];

        resource.payload[key] = resourcesMap[String(value)] || value;
      });
    }

    return resource;
  };

  const readResourceList: ResourceService['readResourceList'] = async (
    params,
  ) => {
    const resources = await fastify.database.resource.findManyAndPopulate({
      collectionId: params.collectionId,
      where: params.where,
      populate: params.populate,
    });

    return resources;
  };

  const createResource: ResourceService['createResource'] = async (data) => {
    const createdResource = await fastify.database.resource.create({
      data: data,
    });

    return createdResource;
  };

  const updateResource: ResourceService['updateResource'] = async (
    resourceId,
    data,
  ) => {
    const updatedResource = await fastify.database.resource.update({
      where: { id: resourceId },
      data: data,
    });

    return updatedResource;
  };

  fastify.decorate<ResourceService>('resourceService', {
    readResource,
    readResourceList,
    createResource,
    updateResource,
  });
};

export default fastifyPlugin(resourceService);
