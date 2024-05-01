import { resourceListReadSchema, resourceCreateSchema } from './schema';

import type { Static } from '@sinclair/typebox';

export type ResourceListReadSchema = {
  Querystring: Static<(typeof resourceListReadSchema)['querystring']>;
};

export type ResourceCreateSchema = {
  Body: Static<(typeof resourceCreateSchema)['body']>;
};
