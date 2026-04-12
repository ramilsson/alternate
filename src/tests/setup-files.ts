import { afterEach, afterAll } from 'vitest';
import { server } from './tests.js';

afterEach(async () => {
  if (!server) return;

  await server.database.project.deleteMany();
  await server.database.collection.deleteMany();
  await server.database.resource.deleteMany();
});

afterAll(async () => {
  if (!server) return;

  await server.close();
});
