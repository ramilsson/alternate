import {
  Resource as DatabaseResource,
  ResourceWithObjects as DatabaseResourceWithObjects,
  ResourceFindManyAndPopulateParams,
} from '../../database/types.js';
import type { Object } from '../../storage/object-service/types.js';

export interface ResourceServiceOptions {}

export interface ResourceService {
  transformResource: (
    resource: DatabaseResource | DatabaseResourceWithObjects,
  ) => Promise<Resource>;

  readResource: (params: {
    resourceId: Resource['id'];
    populate?: string[];
    include?: { objects: boolean };
  }) => Promise<Resource>;
  readResourceList: (
    params: ResourceFindManyAndPopulateParams,
  ) => Promise<Resource[]>;
  createResource: (
    data: Pick<Resource, 'collectionId' | 'payload'>,
  ) => Promise<Resource>;
  updateResource: (
    resourceId: Resource['id'],
    data: Pick<Resource, 'payload'>,
  ) => Promise<Resource>;
}

export interface Resource extends DatabaseResource {
  objects?: Object[];
}
