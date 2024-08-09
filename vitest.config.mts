import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['src/tests/setup-files.ts'],
    globalSetup: ['src/tests/global-setup.ts'],
    passWithNoTests: true,

    /**
     * Limit number of workers to ensure that asynchronous fixtures initialize sequentially.
     * @TODO Create issue on vitest?
     */
    minWorkers: 1,
    maxWorkers: 1,
  },
});
