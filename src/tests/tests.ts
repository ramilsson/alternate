import { test as testBase } from 'vitest';
import { server } from './global-setup';

import type { Fixtures } from './types';

export const test = testBase.extend<Fixtures>({
  server: async ({}, use) => {
    await use(server);
  },
});
