declare global {
  namespace PrismaJson {
    interface Field {
      type: 'literal';
      key: string;
      value: unknown;
    }
  }
}

export {};
