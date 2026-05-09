import type { Resource } from '../../../resource-service/types.js';
import { isResource } from './is-resource.js';

export function isResourceList(data: unknown): data is Resource[] {
  return Array.isArray(data) && isResource(data.at(0));
}
