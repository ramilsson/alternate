import type { Static } from '@sinclair/typebox';
import type {
  collectionCreateSchema,
  collectionListReadSchema,
  collectionReadSchema,
  collectionUpdateSchema,
} from './schema.js';

export type CollectionListReadSchema = {
  Querystring: Static<(typeof collectionListReadSchema)['querystring']>;
};

export type CollectionReadSchema = {
  Params: Static<(typeof collectionReadSchema)['params']>;
};

export type CollectionCreateSchema = {
  Body: Static<(typeof collectionCreateSchema)['body']>;
};

export type CollectionUpdateSchema = {
  Params: Static<(typeof collectionUpdateSchema)['params']>;
  Body: Static<(typeof collectionUpdateSchema)['body']>;
};
