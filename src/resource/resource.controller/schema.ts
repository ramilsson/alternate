import { Type as T } from '@sinclair/typebox';

export const attributeSchema = T.Object(
  {
    type: T.Union([
      T.Literal('LITERAL_NUMBER'),
      T.Literal('LITERAL_STRING'),
      T.Literal('LITERAL_BOOLEAN'),
      T.Literal('LITERAL_JSON'),
    ]),
    name: T.String({ minLength: 1 }),
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
    attributes: T.Array(attributeSchema),
  }),
};

export const resourceUpdateSchema = {
  params: T.Object({
    id: T.String({ minLength: 1 }),
  }),
  body: T.Object(
    {
      attributes: T.Array(attributeSchema),
    },
    { additionalProperties: false }
  ),
};
