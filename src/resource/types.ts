import { Resource, Attribute } from '@prisma/client';

export interface ResourceWithAttributes extends Resource {
  attributes: Attribute[];
}
