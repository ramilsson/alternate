import { Resource } from '@prisma/client';

export function serializeResource(resource: Resource) {
  return {
    ...resource,
    createdAt: resource.createdAt.toISOString(),
    updatedAt: resource.updatedAt.toISOString(),
  };
}
