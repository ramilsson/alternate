import type { Prisma } from '@prisma/client';
import { RESOURCE_RELATIONS_DEPTH } from '../constants.js';

/**
 * Builds a Prisma include argument for recursively fetching resource relations up to a specified depth.
 * @param relations - Array of relation names to filter which outgoing relations to include.
 * @param depth - Maximum recursion depth for following relations. Defaults to RESOURCE_RELATIONS_DEPTH.
 * @returns A Prisma `Resource$outgoingRelationsArgs` object for use in Prisma queries,
 * or `false` if the relations array is empty (indicating no relations should be included).
 */
export function getResourceOutgoingRelationsArgs(
  relations: string[],
  depth = RESOURCE_RELATIONS_DEPTH,
): Prisma.Resource$outgoingRelationsArgs | false {
  if (!relations.length) return false;

  const fn = (depthIndex: number): Prisma.Resource$outgoingRelationsArgs => {
    if (depthIndex < depth) {
      return {
        where: { name: { in: relations } },
        include: { targetResource: { include: { outgoingRelations: fn(depthIndex + 1) } } },
      };
    }

    return {
      where: { name: { in: relations } },
      include: { targetResource: true },
    };
  };

  return fn(0);
}
