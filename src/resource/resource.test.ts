import { describe, expect } from 'vitest';
import { AttributeType } from '@prisma/client';
import { test } from '../tests';
import { AttributeSchema } from './resource.controller';
import { ResourceWithAttributes } from './types';

describe('Resource creation', () => {
  describe('Cannot create resource with invalid attributes', async () => {
    const invalidVariantsOfAttributes: unknown[] = [
      undefined,
      [{}],
      [{ invalidKey: 'value' }],
      [{ type: '' }],
      [{ type: 'another invalid type value' }],
      [{ type: 'literal' }],
      [{ type: 'literal', value: '' }],
      [{ type: 'literal', value: '', key: '' }],
    ];

    for (const [index, attributes] of invalidVariantsOfAttributes.entries()) {
      test(`Cannot create resource with invalid attributes: ${index}`, async ({
        server,
        oneCollection,
      }) => {
        const response = await server.inject({
          url: '/resource',
          method: 'POST',
          payload: {
            collectionId: oneCollection.id,
            attributes: attributes,
          },
        });

        const resourcesCount = await server.database.resource.count();

        expect(response.statusCode).toBe(400);
        expect(resourcesCount).toBe(0);
      });
    }
  });

  describe('Can create resource with valid attributes', async () => {
    const validVariantsOfAttributes: AttributeSchema[][] = [
      // empty attributes
      [],
      // attributes with one item
      [
        {
          type: AttributeType.LITERAL_NUMBER,
          name: 'number attribute',
          value: 'value',
        },
      ],
      // attributes with multiple items and different type of values
      [
        {
          type: AttributeType.LITERAL_STRING,
          name: 'string attribute',
          value: 'this is string',
        },
        {
          type: AttributeType.LITERAL_BOOLEAN,
          name: 'boolean attribute',
          value: true,
        },
        {
          type: AttributeType.LITERAL_JSON,
          name: 'json object attribute',
          value: { key: 'value' },
        },
        {
          type: AttributeType.LITERAL_JSON,
          name: 'json array attribute',
          value: [1, 2, 3],
        },
        {
          type: AttributeType.LITERAL_NUMBER,
          name: 'another number attribute',
          value: 0,
        },
        {
          type: AttributeType.LITERAL_NUMBER,
          name: 'another string attribute',
          value: 'string value',
        },
      ],
    ];

    for (const [index, attributes] of validVariantsOfAttributes.entries()) {
      test(`Can create resource with valid attributes: ${index}`, async ({
        server,
        oneCollection,
      }) => {
        const response = await server.inject({
          url: '/resource',
          method: 'POST',
          payload: {
            collectionId: oneCollection.id,
            attributes: attributes,
          },
        });

        const parsedBody = JSON.parse(response.body);
        const resourcesCount = await server.database.resource.count();

        expect(response.statusCode).toBe(201);
        expect(resourcesCount).toBe(1);
        expect(parsedBody.attributes.length).toBe(attributes.length);
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
              data: [{}, {}, {}, {}],
            },
          },
        },
        include: { resources: { include: { attributes: true } } },
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

describe('Resource updating', () => {
  test('Can update attributes of resource', async ({
    server,
    oneResource: resourceToUpdate,
  }) => {
    const newAttributes = resourceToUpdate.attributes.map((attr) => ({
      type: attr.type,
      name: attr.name,
      value: 'new value',
    }));

    const response = await server.inject({
      url: `/resource/${resourceToUpdate.id}`,
      method: 'PATCH',
      payload: { attributes: newAttributes },
    });

    const updatedResource = JSON.parse(response.body) as ResourceWithAttributes;

    expect(response.statusCode).toBe(200);
    expect(
      updatedResource.attributes.map((a) => ({
        type: a.type,
        name: a.name,
        value: a.value,
      }))
    ).toEqual(newAttributes);
  });

  test('Cannot move resource to other collection by changing collectionId', async ({
    server,
    oneProject,
    oneResource: resourceToUpdate,
  }) => {
    const oldCollectionId = resourceToUpdate.collectionId;

    const { id: newCollectionId } = await server.database.collection.create({
      data: { name: 'new collection', projectId: oneProject.id },
    });

    const response = await server.inject({
      url: `/resource/${resourceToUpdate.id}`,
      method: 'PATCH',
      payload: { attributes: [], collectionId: newCollectionId },
    });

    const updatedResource = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(updatedResource.collectionId).toEqual(oldCollectionId);
  });
});
