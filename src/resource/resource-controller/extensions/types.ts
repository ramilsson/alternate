import type { FastifyRequest, preSerializationAsyncHookHandler } from 'fastify';
import type { Resource } from '../../resource-service/types.js';

export interface ExtensionsPlugin {
  preSerialization: preSerializationAsyncHookHandler;
}

interface PayloadTransformParams {
  query: FastifyRequest['query'];
  resource: Resource;
}

export interface Extension {
  name: string;
  version: string;
  transformPayload: (params: PayloadTransformParams) => Resource['payload'];
}
