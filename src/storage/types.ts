export { Object, ObjectStatus } from '@prisma/client';

export interface StorageOptions {
  minioOptions: {
    host: string;
    port: number;
    accessKey: string;
    secretKey: string;
    useSSL: boolean;
    bucketName: string;
  };
}
