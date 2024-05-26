import { afterEach, afterAll } from 'vitest';
import { server } from './tests';

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
