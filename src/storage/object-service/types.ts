import type { Client as MinioClient, PostPolicyResult } from 'minio';
import { Object as DatabaseObject } from '../../database/types.js';

export interface ObjectServiceOptions {
  minioClient: MinioClient;
  bucketName: string;
}

export interface Object extends DatabaseObject {
  url: string | null;
  postPolicy: PostPolicyResult | null;
}

export interface ObjectService {
  readObjectList: (resourceId: Object['resourceId']) => Promise<Object[]>;
  createObject: (
    data: Pick<Object, 'resourceId' | 'fileName'> & { key?: Object['key'] },
  ) => Promise<Object>;
  updateObject: (
    id: Object['id'],
    data: Pick<Object, 'status'>,
  ) => Promise<Object>;
}
