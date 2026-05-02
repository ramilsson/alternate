import { describe, expect } from 'vitest';
import { test } from './tests';

describe('Build server', () => {
  test('CORS settings', async ({ server }) => {
    const response = await server.inject({
      method: 'OPTIONS',
      url: `/`,
      headers: {
        origin: 'localhost',
        'access-control-request-method': 'GET',
      },
    });

    const allowCredentials =
      response.headers['access-control-allow-credentials'];
    const allowedMethods = response.headers['access-control-allow-methods'];

    expect(allowCredentials).toBe("true");

    expect(allowedMethods).toContain('GET');
    expect(allowedMethods).toContain('HEAD');
    expect(allowedMethods).toContain('POST');
    expect(allowedMethods).toContain('PATCH');
    expect(allowedMethods).toContain('PUT');
    expect(allowedMethods).toContain('DELETE');
  });
});
