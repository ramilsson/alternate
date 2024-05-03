import { Type as T } from '@sinclair/typebox';

const fieldSchema = T.Object(
  {
    type: T.Union([T.Literal('literal')]),
    key: T.String({ minLength: 1 }),
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

export const resourceUpdateSchema = {
  params: T.Object({
    id: T.String({ minLength: 1 }),
  }),
  body: T.Object(
    {
      fields: T.Array(fieldSchema),
    },
    { additionalProperties: false }
  ),
};
