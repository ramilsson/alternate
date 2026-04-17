import mime from 'mime';
import { Client as MinioClient } from 'minio';
import { Object } from './types.js';

export async function getPresignedPostPolicy(
  object: Object & { name: string },
  minioClient: MinioClient,
  bucket: string,
) {
  const policy = minioClient.newPostPolicy();

  const expires = new Date();
  expires.setSeconds(60 * 5);

  policy.setBucket(bucket);
  policy.setKey(object.name);
  policy.setExpires(expires);
  policy.setContentDisposition(`attachment; filename="${object.fileName}"`);
  policy.setUserMetaData({ resourceId: object.resourceId });

  const contentType = mime.getType(object.fileName);

  if (contentType) {
    policy.setContentType(contentType);
  }

  return await minioClient.presignedPostPolicy(policy);
}
