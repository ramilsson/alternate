import type { PostPolicyResult } from 'minio';
import { Object as DatabaseObject } from '../../database/types.js';

export interface Object extends DatabaseObject {
  url: string | null;
  postPolicy: PostPolicyResult | null;
}

export interface ObjectService {
  transformObject: (object: DatabaseObject) => Promise<Object>;

  readObjectList: (resourceId: Object['resourceId']) => Promise<Object[]>;
  createObject: (
    data: Pick<Object, 'resourceId' | 'fileName'> & { key?: Object['key'] },
  ) => Promise<Object>;
  updateObject: (
    id: Object['id'],
    data: Pick<Object, 'status'>,
  ) => Promise<Object>;
}
