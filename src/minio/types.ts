export { Object, ObjectStatus } from '@prisma/client';
import type { Client as MinioClient } from 'minio';

export interface MinioOptions {
  host: string;
  port: number;
  accessKey: string;
  secretKey: string;
  useSSL: boolean;
  bucketName: string;
}

export interface Minio {
  client: MinioClient;
  bucketName: string;
}
