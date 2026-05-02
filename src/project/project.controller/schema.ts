import { Type as T } from '@sinclair/typebox';

export const projectReadSchema = {
  params: T.Object({
    id: T.String({ minLength: 1 }),
  }),
};

export const projectCreateSchema = {
  body: T.Object({
    name: T.String({ minLength: 1 }),
  }),
};
