import { describe, expect } from 'vitest';

import resourceService from './resource-service.js';
import { ResourceService } from './types.js';
import { test as testBase } from '../../tests/index.js';
import { inspect } from 'node:util';

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
    oneCollection,
  }) => {
    const newResource = await resourceFactory.createResource(oneCollection);

    const resource = await resourceService.readResource({
      resourceId: newResource.id,
    });

    expect(resource).toMatchObject(newResource);
  });

  test('Read one resource with populated payload property', async ({
    collectionFactory,
    resourceFactory,
    resourceService,
    oneCollection,
  }) => {
    const resource = await resourceFactory.createResource(oneCollection);
    const newCollection = await collectionFactory.createCollection();

    // Create new resource in new collection with a reference to other existing resource
    const { id: newResourceId } = await resourceService.createResource({
      collectionId: newCollection.id,
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

    expect(objects).toBeDefined();
    expect(object).toHaveProperty('url');
  });

  test('Read resource list including their objects', async ({
    resourceService,
    objectFactory,
    resourceFactory,
    oneCollection,
  }) => {
    const newResource = await resourceFactory.createResource(oneCollection);
    const newObject = await objectFactory.createObject(newResource);

    const resources = await resourceService.readResourceList({
      collectionId: newResource.collectionId,
      include: { objects: true },
    });

    console.log(inspect(resources, true, 8));

    // Check if resources have objects array:
    const hasObjectsArray = resources.every((r) => Array.isArray(r.objects));

    expect(hasObjectsArray).toBeTruthy();

    // Check the first object's structure:
    const object = resources.at(0)?.objects?.at(0);

    expect(object).toBeDefined();
    expect(object).toHaveProperty('url');
  });
});
