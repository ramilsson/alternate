import { Type as T } from '@sinclair/typebox';

const fieldSchema = T.Object(
  {
    type: T.Union([T.Literal('literal')]),
    value: T.Unknown(),
  },
  { additionalProperties: false }
);

export const resourceListReadSchema = {
  querystring: T.Object({
    collectionId: T.String({ minLength: 1 }),
  }),
};

export const resourceCreateSchema = {
  body: T.Object({
    collectionId: T.String({ minLength: 1 }),
    fields: T.Array(fieldSchema),
  }),
};