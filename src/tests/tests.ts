import { test as testBase } from 'vitest';
import { server } from './global-setup';

import type { Fixtures } from './types';

export const test = testBase.extend<Fixtures>({
  server: async ({}, use) => {
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
});
