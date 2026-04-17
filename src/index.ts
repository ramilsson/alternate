import { buildServer } from './build-server.js';
import { serverOptions } from './settings.js';

const server = buildServer({
  serverOptions,
  minioOptions: {
    host: String(process.env.MINIO_HOST),
    port: Number(process.env.MINIO_PORT),
    accessKey: String(process.env.MINIO_ACCESS_KEY),
    secretKey: String(process.env.MINIO_SECRET_KEY),
    bucketName: String(process.env.MINIO_BUCKET_NAME),
    useSSL: process.env.MINIO_USE_SSL === 'true',
  },
});

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
