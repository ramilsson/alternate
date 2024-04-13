import { test as testBase } from 'vitest';
import { buildServer } from './build-server';

import type { FastifyInstance } from 'fastify';

interface Fixtures {
  server: FastifyInstance;
}

export const test = testBase.extend<Fixtures>({
  server: async ({}, use) => {
    const server = buildServer();

    await use(server);

    server.close();
  },
});
