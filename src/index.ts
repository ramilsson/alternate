import { buildServer } from './build-server.js';
import { serverOptions } from './settings.js';

const server = buildServer(serverOptions);

const start = async () => {
  try {
    server.listen({
      host: '0.0.0.0',
      port: Number(process.env.PORT) || 5000,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
