import { ResourceFindManyAndPopulateParams } from '../../database/types';

type ResourceWhereInput = ResourceFindManyAndPopulateParams['where'];

/**
 * A lightweight runtime check to verify if an unknown value could be a valid `ResourceWhereInput`.
 *
 * @param where - The value to check (typically parsed from query params)
 * @returns `true` if the value is either `undefined` or a non-null object, `false` otherwise
 * @note This is currently a minimal implementation that only checks the value's type.
 * @todo Implement proper validation against the full `ResourceWhereInput` schema:
 */
export function isValidResourceWhereInput(
  where: unknown
): where is ResourceWhereInput {
  if (where === undefined) return true;

  return typeof where === 'object' && where !== null;
}
