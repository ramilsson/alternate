import { projectCreateSchema } from './schema.js';

import type { Static } from '@sinclair/typebox';

export type ProjectCreateSchema = {
  Body: Static<(typeof projectCreateSchema)['body']>;
};
