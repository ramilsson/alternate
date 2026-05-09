import type { Collection } from '../../../database/types.js';
import type { Resource, ResourceTransformParams } from '../types.js';

export interface ExtensionsPlugin {
  getExtensions: (collection: Collection) => Extension[] | null;
}

interface PayloadTransformParams extends Pick<ResourceTransformParams, 'resource' | 'params'> {
  relations: Resource['relations'];
}

export interface Extension {
  name: string;
  version: string;
  transformPayload: (params: PayloadTransformParams) => Resource['payload'];
}
