import { describe, expect } from 'vitest';
import { test } from '../tests';

const COLLECTION_NAME = 'test-collection-name';

describe('Collection fetching', () => {
  test('Cannot fetch list of collections without projectId', async ({
    server,
  }) => {
    const response = await server.inject({
      url: '/collection',
      method: 'GET',
    });

    expect(response.statusCode).toBe(400);
  });

  test('Can fetch list of collections of single project only', async ({
    server,
    manyCollections,
  }) => {
    const projectWithNoCollections = await server.database.project.create({
      data: { name: 'Project with no collections' },
    });

    const response = await server.inject({
      url: '/collection',
      method: 'GET',
      query: { projectId: projectWithNoCollections.id },
    });

    const parsedBody = JSON.parse(response.body);
    const collectionsCount = await server.database.collection.count();

    // Ensure that there are some collections in database...
    expect(collectionsCount).toBeGreaterThan(0);
    // ...but expect to not have these collections in response
    expect(parsedBody).toEqual([]);
  });

  test('Can fetch list of collections of project', async ({ server }) => {
    const projectWithCollections = await server.database.project.create({
      data: {
        name: 'Project with collections',
        collections: {
          createMany: {
            data: [{ name: 'Collection 1' }, { name: 'Collection 2' }],
          },
        },
      },
      include: { collections: true },
    });

    const response = await server.inject({
      url: '/collection',
      method: 'GET',
      query: { projectId: projectWithCollections.id },
    });

    const parsedBody = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(parsedBody).toEqual(projectWithCollections.collections);
  });
});

describe('Collection creation', () => {
  test.todo('Cannot create collection with invalid payload');

  test('Cannot create collection with the same name', async ({
    server,
    oneProject,
  }) => {
    // Create collection with COLLECTION_NAME directly in database
    await server.database.collection.create({
      data: { name: COLLECTION_NAME, projectId: oneProject.id },
    });

    // Try to create collection with COLLECTION_NAME again using api
    const response = await server.inject({
      url: '/collection',
      method: 'POST',
      payload: { name: COLLECTION_NAME },
    });

    const collectionsCount = await server.database.collection.count();

    expect(response.statusCode).toBe(400);
    expect(collectionsCount).toBe(1);
  });

  test('Can create collection', async ({ server, oneProject }) => {
    const response = await server.inject({
      url: '/collection',
      method: 'POST',
      payload: { name: COLLECTION_NAME, projectId: oneProject.id },
    });

    const parsedBody = JSON.parse(response.body);
    const collectionsCount = await server.database.collection.count();

    expect(response.statusCode).toBe(201);
    expect(collectionsCount).toBe(1);
    expect(parsedBody).toEqual({
      id: parsedBody.id,
      name: COLLECTION_NAME,
      projectId: oneProject.id,
    });
  });
});
