import type { Static } from '@sinclair/typebox';

import type { ResourceService } from '../resource-service/index.js';

import type {
  resourceCreateSchema,
  resourceListReadSchema,
  resourceReadSchema,
  resourceUpdateSchema,
} from './schema.js';

export interface ResourceControllerOptions {
  resourceService: ResourceService;
}

export type ResourceReadSchema = {
  Params: Static<(typeof resourceReadSchema)['params']>;
  Querystring: Static<(typeof resourceReadSchema)['querystring']>;
};

export type ResourceListReadSchema = {
  Querystring: Static<(typeof resourceListReadSchema)['querystring']>;
};

export type ResourceCreateSchema = {
  Body: Static<(typeof resourceCreateSchema)['body']>;
};

export type ResourceUpdateSchema = {
  Params: Static<(typeof resourceUpdateSchema)['params']>;
  Body: Static<(typeof resourceUpdateSchema)['body']>;
};
