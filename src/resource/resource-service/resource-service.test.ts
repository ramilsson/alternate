import { describe, expect } from 'vitest';

import resourceService from './resource-service.js';
import { ResourceService } from './types.js';
import { test as testBase } from '../../tests/index.js';

interface Fixtures {
  resourceService: ResourceService;
}

const test = testBase.extend<Fixtures>({
  resourceService: async ({ server }, use) => {
    if (!server.resourceService) {
      server.register(resourceService);
    }

    await server.ready();

    use(server.resourceService);
  },
});

describe('Resource service', () => {
  test('Read one resource by id', async ({
    resourceService,
    resourceFactory,
  }) => {
    const newResource = await resourceFactory.createResource();

    const resource = await resourceService.readResource({
      resourceId: newResource.id,
    });

    expect(resource).toMatchObject(newResource);
  });

  test('Read one resource with populated payload property', async ({
    collectionFactory,
    resourceFactory,
    resourceService,
  }) => {
    const resource = await resourceFactory.createResource();
    const collection = await collectionFactory.createCollection();

    // Create new resource in new collection with a reference to other existing resource
    const { id: newResourceId } = await resourceService.createResource({
      collectionId: collection.id,
      payload: { resourceIdToPopulate: resource.id },
    });

    // Read created resource by id
    const newResource = await resourceService.readResource({
      resourceId: newResourceId,
      populate: ['resourceIdToPopulate'],
    });

    expect(newResource).toMatchObject({
      payload: { resourceIdToPopulate: resource },
    });
  });

  test('Read one resource including its objects', async ({
    resourceService,
    oneObject,
  }) => {
    const resource = await resourceService.readResource({
      resourceId: oneObject.resourceId,
      include: { objects: true },
    });

    const objects = resource.objects;
    const object = objects?.at(0);

    expect(objects).toBeTruthy();
    expect(object?.url).toBeTruthy();
  });
});
