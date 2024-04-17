import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['src/tests/setup.ts'],
    globalSetup: ['src/tests/db.global-setup.ts', 'src/tests/server.global-setup.ts'],
  },
});
