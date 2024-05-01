import { describe, expect } from 'vitest';
import { test } from '../tests';

describe('Resource creation', () => {
  describe('Cannot create resource with invalid fields', async () => {
    const invalidVariantsOfFields: any[] = [
      undefined,
      [{}],
      [{ invalidKey: 'value' }],
      [{ type: '' }],
      [{ type: 'another invalid type value' }],
      [{ type: 'literal' }],
      [{ type: 'literal', value: '' }],
      [{ type: 'literal', value: '', key: '' }],
    ];

    for (const [index, fields] of invalidVariantsOfFields.entries()) {
      test(`Cannot create resource with invalid fields: ${index}`, async ({
        server,
        oneCollection,
      }) => {
        const response = await server.inject({
          url: '/resource',
          method: 'POST',
          payload: {
            collectionId: oneCollection.id,
            fields: fields,
          },
        });

        const resourcesCount = await server.database.resource.count();

        expect(response.statusCode).toBe(400);
        expect(resourcesCount).toBe(0);
      });
    }
  });

  describe('Can create resource with valid fields', async () => {
    const validVariantsOfFields: any[] = [
      // empty fields
      [],
      // fields with one item
      [{ type: 'literal', key: 'key', value: 'value' }],
      // fields with multiple items and different type of values
      [
        { type: 'literal', key: 'string field', value: 'this is string' },
        { type: 'literal', key: 'number field', value: 0 },
        { type: 'literal', key: 'object field', value: {} },
        { type: 'literal', key: 'array field', value: [] },
        { type: 'literal', key: 'null field', value: null },
        { type: 'literal', key: 'boolean field', value: true },
      ],
    ];

    for (const [index, fields] of validVariantsOfFields.entries()) {
      test(`Can create resource with valid fields: ${index}`, async ({
        server,
        oneCollection,
      }) => {
        const response = await server.inject({
          url: '/resource',
          method: 'POST',
          payload: {
            collectionId: oneCollection.id,
            fields: fields,
          },
        });

        const parsedBody = JSON.parse(response.body);
        const resourcesCount = await server.database.resource.count();

        expect(response.statusCode).toBe(201);
        expect(resourcesCount).toBe(1);
        expect(parsedBody).toEqual({
          id: parsedBody.id,
          collectionId: oneCollection.id,
          fields: fields,
        });
      });
    }
  });

  describe('Resource reading', () => {
    test('Cannot read list of resources with no collection id', async ({
      server,
    }) => {
      const response = await server.inject({
        url: '/resource',
        method: 'GET',
      });

      expect(response.statusCode).toBe(400);
    });

    test('Can read list of resources of single collection only', async ({
      server,
      oneProject,
      manyResources,
    }) => {
      const collectionWithResources = await server.database.collection.create({
        data: {
          name: 'Collection with resources',
          projectId: oneProject.id,
          resources: {
            createMany: {
              data: [
                { fields: [{ type: 'literal', key: 'key1', value: 0 }] },
                { fields: [{ type: 'literal', key: 'key2', value: 1 }] },
                { fields: [{ type: 'literal', key: 'key3', value: 2 }] },
                { fields: [{ type: 'literal', key: 'key4', value: 3 }] },
              ],
            },
          },
        },
        include: { resources: true },
      });

      const response = await server.inject({
        url: '/resource',
        method: 'GET',
        query: { collectionId: collectionWithResources.id },
      });

      const parsedBody = JSON.parse(response.body);
      const totalResourcesCount = await server.database.resource.count();

      expect(response.statusCode).toBe(200);

      // Ensure that there are more resources in database...
      expect(totalResourcesCount).toBeGreaterThan(
        collectionWithResources.resources.length
      );
      // ...but we get only the resources of given one collection in response
      expect(parsedBody).toEqual(collectionWithResources.resources);
    });
  });
});
