import { afterEach } from 'vitest';
import { server } from './global-setup';

afterEach(async () => {
  await server.database.project.deleteMany();
  await server.database.collection.deleteMany();
});
