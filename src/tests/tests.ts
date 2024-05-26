/**
 * @file Beware that this file could run multiple times (once per test file),
 * because vitest runs each test file in isolation by default.
 * @see https://vitest.dev/config/#setupfiles
 * @see https://vitest.dev/guide/improving-performance
 */

import { test as testBase } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildServer } from '../build-server';
import type { Fixtures } from './types';

export let server: FastifyInstance | null = null;

export const test = testBase.extend<Fixtures>({
  server: async ({}, use) => {
    if (!server) {
      server = buildServer();
      await server.ready();
    }

    await use(server);
  },

  oneProject: async ({ server }, use) => {
    const project = await server.database.project.create({
      data: { name: 'Test project' },
    });

    await use(project);

    await server.database.project.deleteMany();
  },

  manyProjects: async ({ server }, use) => {
    const projectsData = Array(10)
      .fill(null)
      .map((item, index) => ({
        name: `Project ${index}`,
      }));

    await server.database.project.createMany({
      data: projectsData,
    });

    const projects = await server.database.project.findMany();

    await use(projects);

    await server.database.project.deleteMany();
  },

  oneCollection: async ({ server, oneProject }, use) => {
    const collection = await server.database.collection.create({
      data: { name: 'Test collection', projectId: oneProject.id },
    });

    await use(collection);

    await server.database.collection.deleteMany();
  },

  manyCollections: async ({ server, oneProject }, use) => {
    const collectionsData = Array(10)
      .fill(null)
      .map((item, index) => ({
        name: `Collection ${index}`,
        projectId: oneProject.id,
      }));

    await server.database.collection.createMany({
      data: collectionsData,
    });

    const collections = await server.database.collection.findMany();

    await use(collections);

    await server.database.collection.deleteMany();
  },

  oneResource: async ({ server, oneCollection }, use) => {
    const resource = await server.database.resource.create({
      data: {
        collectionId: oneCollection.id,
        fields: [{ type: 'literal', key: 'some key', value: `some value` }],
      },
    });

    await use(resource);

    await server.database.resource.deleteMany();
  },

  manyResources: async ({ server, oneCollection }, use) => {
    const resourcesData = Array(10)
      .fill(null)
      .map((item, index) => ({
        collectionId: oneCollection.id,
        fields: [
          {
            type: 'literal',
            key: 'some key',
            value: `some value ${index}`,
          } as const,
        ],
      }));

    await server.database.resource.createMany({
      data: resourcesData,
    });

    const resources = await server.database.resource.findMany();

    await use(resources);

    await server.database.resource.deleteMany();
  },
});
