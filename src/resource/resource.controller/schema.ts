import { Type as T } from '@sinclair/typebox';

export const resourceListReadSchema = {
  querystring: T.Object({
    collectionId: T.String({ minLength: 1 }),
    populate: T.Optional(T.Array(T.String())),
  }),
};

export const resourceCreateSchema = {
  body: T.Object({
    collectionId: T.String({ minLength: 1 }),
    payload: T.Object({}),
  }),
};

export const resourceUpdateSchema = {
  params: T.Object({
    id: T.String({ minLength: 1 }),
  }),
  body: T.Object(
    {
      payload: T.Object({}),
    },
    { additionalProperties: false }
  ),
};
