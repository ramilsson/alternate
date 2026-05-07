import type { Static } from '@sinclair/typebox';
import type { projectCreateSchema, projectReadSchema } from './schema.js';

export type ProjectReadSchema = {
  Params: Static<(typeof projectReadSchema)['params']>;
};

export type ProjectCreateSchema = {
  Body: Static<(typeof projectCreateSchema)['body']>;
};
