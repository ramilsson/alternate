import { buildServer } from '../build-server';

export const server = buildServer();

export async function setup() {
  await server.ready();
}

export async function teardown() {
  await server.close();
}
