import type { JSONType, SchemaObject } from 'ajv';

declare global {
  namespace PrismaJson {
    type ResourcePayload = { [property: string]: unknown };
    type ResourcePayloadSchema = SchemaObject & {
      properties: {
        [property: string]: {
          type: JSONType;
          'x-type'?: string;
        };
      };
    };
  }
}
