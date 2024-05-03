import {
  resourceListReadSchema,
  resourceCreateSchema,
  resourceUpdateSchema,
} from './schema';

import type { Static } from '@sinclair/typebox';

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
