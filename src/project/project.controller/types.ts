import { projectReadSchema, projectCreateSchema } from './schema.js';

import type { Static } from '@sinclair/typebox';

export type ProjectReadSchema = {
  Params: Static<(typeof projectReadSchema)['params']>;
};

export type ProjectCreateSchema = {
  Body: Static<(typeof projectCreateSchema)['body']>;
};
