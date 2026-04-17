import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { PostgreSqlContainer } from '@testcontainers/postgresql';

async function runMigrations() {
  const command = `prisma db push --skip-generate`;
  const promisifiedExec = promisify(exec);
  const result = await promisifiedExec(command);
  console.log(result.stdout);
}

export default async function setup() {
  console.log('Database setup...');

  const container = await new PostgreSqlContainer(process.env.DATABASE_IMAGE)
    .withDatabase(String(process.env.DATABASE_NAME))
    .withUsername(String(process.env.DATABASE_USER))
    .withPassword(String(process.env.DATABASE_PASSWORD))
    .withExposedPorts({
      container: Number(process.env.DATABASE_PORT),
      host: Number(process.env.DATABASE_PORT),
    })
    .start();

  console.log('Database container started');

  console.log('Run migrations...');

  await runMigrations();

  return async function teardown() {
    console.log('Database teardown...');

    await container.stop();

    console.log('Database container stopped');
  };
}
