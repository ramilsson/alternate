import {
  Resource as DatabaseResource,
  ResourceFindManyAndPopulateParams,
} from '../../database/types.js';

export interface ResourceServiceOptions {}

export interface ResourceService {
  readResource: (params: {
    resourceId: Resource['id'];
    populate?: string[];
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

export interface Resource extends DatabaseResource {}
