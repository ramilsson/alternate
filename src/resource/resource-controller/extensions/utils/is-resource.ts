import type { Resource } from '../../../resource-service/types.js';

export function isResource(data: unknown): data is Resource {
  return typeof data === 'object' && data !== null && 'payload' in data;
}
