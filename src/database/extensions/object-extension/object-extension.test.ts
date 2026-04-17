import { describe, expect } from 'vitest';
import { test } from '../../../tests';

describe('Object extension', () => {
  test('Object has correct name property', async ({ oneObject }) => {
    expect(oneObject).toMatchObject({
      name: `${oneObject.id}_${oneObject.fileName}`,
    });
  });
});
