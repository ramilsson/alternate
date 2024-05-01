import { Type as T } from '@sinclair/typebox';

export const collectionListReadSchema = {
  querystring: T.Object({
    projectId: T.String({ minLength: 1 }),
  }),
};

export const collectionCreateSchema = {
  body: T.Object({
    projectId: T.String({ minLength: 1 }),
    name: T.String({ minLength: 1 }),
  }),
};
