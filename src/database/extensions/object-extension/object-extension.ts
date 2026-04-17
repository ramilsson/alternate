import { Prisma } from '@prisma/client';

export const objectExtension = Prisma.defineExtension((client) => {
  return client.$extends({
    result: {
      object: {
        name: {
          needs: { id: true, fileName: true },
          compute(data) {
            return `${data.id}_${data.fileName}`;
          },
        },
      },
    },
  });
});
