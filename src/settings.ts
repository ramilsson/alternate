import type { FastifyServerOptions } from 'fastify';

export const serverOptions: FastifyServerOptions = {
  disableRequestLogging: process.env.NODE_ENV !== 'development',
  ajv: { customOptions: { coerceTypes: false } },
  logger: {
    transport:
      process.env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              levelFirst: true,
              translateTime: 'dd.mm.yy HH:MM:ss',
            },
          }
        : undefined,
  },
};
