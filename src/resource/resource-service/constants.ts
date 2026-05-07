import { Options as AjvOptions, _ } from 'ajv';
import { validate } from 'uuid';

export const AJV_OPTIONS: AjvOptions = {
  /**
   * @see https://ajv.js.org/keywords
   */
  keywords: [
    {
      keyword: 'x-type',
      type: ['string', 'null'],
      metaSchema: { const: 'resource' },
      errors: false,
      validate: (schema: string, data: unknown) => {
        return data === null || validate(data);
      },
    },
    'x-meta',
  ],
};
