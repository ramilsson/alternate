import type { TestProject } from 'vitest/node';
import { GenericContainer, Network } from 'testcontainers';

export default async function setup({ provide }: TestProject) {
  console.log('Minio setup...');

  const network = await new Network().start();

  console.log('Minio network started');

  const MINIO_PORT = 9000;
  const MINIO_UI_PORT = 9001;
  const MINIO_ROOT_USER = 'testminio';
  const MINIO_ROOT_PASSWORD = 'testminio';
  const MINIO_BUCKET_NAME = 'testbucket';
  const NETWORK_ALIAS = 'minio';

  const minioContainer = await new GenericContainer('minio/minio')
    .withNetwork(network)
    .withNetworkAliases(NETWORK_ALIAS)
    .withExposedPorts(MINIO_PORT, {
      container: MINIO_UI_PORT,
      host: MINIO_UI_PORT,
    })
    .withCommand(['server', '--console-address', `:${MINIO_UI_PORT}`, '/data'])
    .withEnvironment({ MINIO_ROOT_USER, MINIO_ROOT_PASSWORD })
    .start();

  console.log('Minio container started');

  const minioHost = minioContainer.getHost();
  const minioPort = minioContainer.getMappedPort(MINIO_PORT);

  provide('MINIO_HOST', minioHost);
  provide('MINIO_PORT', minioPort);
  provide('MINIO_ACCESS_KEY', MINIO_ROOT_USER);
  provide('MINIO_SECRET_KEY', MINIO_ROOT_PASSWORD);
  provide('MINIO_BUCKET_NAME', MINIO_BUCKET_NAME);

  await new GenericContainer('minio/mc')
    .withNetwork(network)
    .withEntrypoint(['/bin/sh'])
    .withCommand([
      '-c',
      `mc alias set default http://${NETWORK_ALIAS}:${MINIO_PORT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && mc mb default/${MINIO_BUCKET_NAME}`,
    ])
    .start();

  return async function teardown() {
    console.log('Minio teardown...');

    await minioContainer.stop();

    console.log('Minio container stopped');
  };
}
