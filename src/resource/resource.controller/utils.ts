import { Prisma } from '@prisma/client';
import { AttributeSchema } from './types';

export function getAttributeCreateInput(
  attribute: AttributeSchema
): Prisma.AttributeCreateWithoutResourceInput {
  let value = attribute.value;

  return {
    type: attribute.type,
    name: attribute.name,
    value: JSON.stringify(value),
  };
}
