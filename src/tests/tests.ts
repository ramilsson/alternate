import { test as testBase } from 'vitest';
import { getServer } from './server.global-setup';

import type { Fixtures } from './types';

export const test = testBase.extend<Fixtures>({
  server: async ({}, use) => {
    const server = getServer();
    await use(server);
  },
});
