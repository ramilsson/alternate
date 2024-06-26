import { describe, expect } from 'vitest';
import { test } from '../tests';

const COLLECTION_NAME = 'test-collection-name';

describe('Collection reading', () => {
  test('Cannot read list of collections without projectId', async ({
    server,
  }) => {
    const response = await server.inject({
      url: '/collection',
      method: 'GET',
    });

    expect(response.statusCode).toBe(400);
  });

  test('Can read list of collections of single project only', async ({
    server,
    manyCollections,
  }) => {
    const projectWithCollections = await server.database.project.create({
      data: {
        name: 'Project with collections',
        collections: {
          createMany: {
            data: [{ name: 'Collection 11' }, { name: 'Collection 22' }],
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
    const totalCollectionsCount = await server.database.collection.count();

    // Ensure that there are more collections in database...
    expect(totalCollectionsCount).toBeGreaterThan(
      projectWithCollections.collections.length
    );
    // ...but we get only the collections of given one project in response
    expect(parsedBody).toEqual(projectWithCollections.collections);
  });

  test('Can read list of collections of project', async ({ server }) => {
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

  test('Cannot create collection with the same name in one project', async ({
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

  test('Can create collections with the same name in different projects', async ({
    server,
    manyProjects,
  }) => {
    const response = await server.inject({
      url: '/collection',
      method: 'POST',
      payload: { name: COLLECTION_NAME, projectId: manyProjects[0].id },
    });
    const response2 = await server.inject({
      url: '/collection',
      method: 'POST',
      payload: { name: COLLECTION_NAME, projectId: manyProjects[1].id },
    });

    const firstCollection = JSON.parse(response.body);
    const secondCollection = JSON.parse(response2.body);
    const collectionsCount = await server.database.collection.count();

    expect(collectionsCount).toBe(2);
    expect(response.statusCode).toBe(201);
    expect(response2.statusCode).toBe(201);
    expect(firstCollection.name).toEqual(secondCollection.name);
  });
});
