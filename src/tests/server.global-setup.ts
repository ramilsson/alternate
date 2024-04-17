import { buildServer } from '../build-server';

const server = buildServer();

export function getServer() {
  return server;
}

export default async function setup() {
  console.log('Server setup...');

  await server.ready();

  return async function teardown() {
    console.log('Server teardown...');

    await server.close();

    console.log('Server closed');
  };
}
