import { describe, expect } from 'vitest';

import { test } from '../../tests/index.js';

describe('Resource controller', () => {
  test('Read one resource including its objects', async ({ server, oneObject }) => {
    const response = await server.inject({
      method: 'get',
      url: `/resource/${oneObject.resourceId}`,
      query: { include: 'objects' },
    });

    const resource = response.json();

    const objects = resource.objects;
    const object = objects?.at(0);

    expect(objects).toBeTruthy();
    expect(object?.url).toBeTruthy();
  });

  test.todo('Extensions');
});
