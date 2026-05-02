import { Type as T } from '@sinclair/typebox';

export const collectionListReadSchema = {
  querystring: T.Object({
    projectId: T.String({ minLength: 1 }),
  }),
};

export const collectionReadSchema = {
  params: T.Object({
    id: T.String({ minLength: 1 }),
  }),
};

export const collectionCreateSchema = {
  body: T.Object({
    projectId: T.String({ minLength: 1 }),
    name: T.String({ minLength: 1 }),
  }),
};

export const collectionUpdateSchema = {
  params: T.Object({
    id: T.String({ minLength: 1 }),
  }),
  body: T.Object(
    {
      schema: T.Optional(T.Object({})),
    },
    { additionalProperties: false },
  ),
};
