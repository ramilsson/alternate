import { type Static, Type as T } from '@sinclair/typebox';

export const objectListReadSchema = {
  querystring: T.Object({
    resourceId: T.String({ minLength: 1 }),
  }),
};

export type ObjectListReadSchema = {
  Querystring: Static<(typeof objectListReadSchema)['querystring']>;
};

export const objectCreateSchema = {
  body: T.Object({
    resourceId: T.String({ minLength: 1 }),
    fileName: T.String({ minLength: 1 }),
  }),
};

export type ObjectCreateSchema = {
  Body: Static<(typeof objectCreateSchema)['body']>;
};

export const objectUpdateSchema = {
  params: T.Object({
    id: T.String({ minLength: 1 }),
  }),
  body: T.Object(
    {
      status: T.Enum({ DRAFT: 'DRAFT', UPLOADED: 'UPLOADED' }),
    },
    { additionalProperties: false },
  ),
};

export type ObjectUpdateSchema = {
  Params: Static<(typeof objectUpdateSchema)['params']>;
  Body: Static<(typeof objectUpdateSchema)['body']>;
};
