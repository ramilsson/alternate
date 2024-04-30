import { Type as T } from '@sinclair/typebox';

export const projectCreateSchema = {
  body: T.Object({
    name: T.String({ minLength: 1 }),
  }),
};
