import { projectCreateSchema } from './schema';

import type { Static } from '@sinclair/typebox';

export type ProjectCreateSchema = {
  Body: Static<(typeof projectCreateSchema)['body']>;
};
