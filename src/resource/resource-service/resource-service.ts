import { type FastifyPluginAsync } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';

import type { ResourceService, ResourceServiceOptions } from './types.js';

const resourceService: FastifyPluginAsync<ResourceServiceOptions> = async (
  fastify,
) => {
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
    readResourceList,
    createResource,
    updateResource,
  });
};

export default fastifyPlugin(resourceService);
