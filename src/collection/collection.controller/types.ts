import { collectionListReadSchema, collectionCreateSchema } from './schema';

import type { Static } from '@sinclair/typebox';

export type CollectionListReadSchema = {
  Querystring: Static<(typeof collectionListReadSchema)['querystring']>;
};

export type CollectionCreateSchema = {
  Body: Static<(typeof collectionCreateSchema)['body']>;
};
