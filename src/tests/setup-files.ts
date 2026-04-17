import { afterEach, afterAll } from 'vitest';
import { server } from './tests.js';

afterEach(async () => {
  if (!server) return;

  await server.database.project.deleteMany();
  await server.database.collection.deleteMany();
  await server.database.resource.deleteMany();
  await server.database.object.deleteMany();
});

afterAll(async () => {
  if (!server) return;

  await server.close();
});
