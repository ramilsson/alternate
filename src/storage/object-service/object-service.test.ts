import { describe, expect } from 'vitest';

import { ObjectService } from './types.js';
import objectService from './object-service.js';
import { test as testBase } from '../../tests/index.js';

interface Fixtures {
  objectService: ObjectService;
}

const test = testBase.extend<Fixtures>({
  objectService: async ({ server, minioClient, bucketName }, use) => {
    server.register(objectService, { minioClient, bucketName });

    await server.ready();

    use(server.objectService);
  },
});

describe('Object service', () => {
  test('Object has correct url property', async ({
    objectService,
    oneObject,
  }) => {
    const objects = await objectService.readObjectList(oneObject.resourceId);
    const object = objects.at(0);

    expect(object).toHaveProperty('url');
    expect(object?.url).toBeTypeOf('string');
  });
});
