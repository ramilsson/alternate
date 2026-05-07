import { describe, expect } from 'vitest';
import type { PostPolicyResult } from 'minio';

import { test } from '../tests/index.js';
import { ObjectStatus } from './types.js';

describe('Storage', () => {
  test('Read objects', async ({ server, oneObject }) => {
    const response = await server.inject({
      method: 'GET',
      url: '/object',
      query: { resourceId: oneObject.resourceId },
    });

    const objects = response.json();

    expect(response.statusCode).toBe(200);

    expect(objects).toBeInstanceOf(Array);
    expect(objects.at(0)).toMatchObject({
      id: oneObject.id,
      resourceId: oneObject.resourceId,
      name: oneObject.name,
    });
  });

  test('Create and return object with presigned POST policy', async ({ server, oneResource, oneFile }) => {
    const response = await server.inject({
      method: 'POST',
      url: '/object',
      payload: { resourceId: oneResource.id, fileName: oneFile.name },
    });

    const object = response.json();
    const objectsCount = await server.database.object.count();

    expect(response.statusCode).toBe(201);
    expect(objectsCount).toBe(1);
    expect(object).toMatchObject({
      fileName: oneFile.name,
      resourceId: oneResource.id,
      status: ObjectStatus.DRAFT,
    });

    expect(object).toHaveProperty('postPolicy');
    expect(object.postPolicy).toHaveProperty('postURL');
    expect(object.postPolicy).toHaveProperty('formData');
  });

  test('Upload file using presigned POST policy', async ({ server, oneResource, oneFile }) => {
    const objectCreateResponse = await server.inject({
      method: 'POST',
      url: '/object',
      payload: { resourceId: oneResource.id, fileName: oneFile.name },
    });

    const object = objectCreateResponse.json();

    const form = new FormData();
    const postPolicy: PostPolicyResult = object.postPolicy;

    Object.entries(postPolicy.formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    form.append('file', oneFile.content);

    const uploadResponse = await fetch(postPolicy.postURL, {
      method: 'post',
      body: form,
    });

    expect(uploadResponse.ok).toBe(true);

    const updateResponse = await server.inject({
      method: 'PATCH',
      url: `/object/${object.id}`,
      payload: { status: ObjectStatus.UPLOADED },
    });

    const updatedObject = updateResponse.json();

    expect(updateResponse.statusCode).toBe(200);
    expect(updatedObject).toMatchObject({ status: ObjectStatus.UPLOADED });
    expect(updatedObject).toHaveProperty('url');
  });
});
