import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Client as MinioClient } from 'minio';
import { MinioOptions, Minio } from './types.js';

const minio: FastifyPluginAsync<MinioOptions> = async (fastify, options) => {
  const client = new MinioClient({
    endPoint: options.host,
    port: options.port,
    useSSL: options.useSSL,
    accessKey: options.accessKey,
    secretKey: options.secretKey,
  });

  const bucketName = options.bucketName;

  fastify.decorate<Minio>('minio', { client, bucketName });
};

export default fastifyPlugin(minio);
