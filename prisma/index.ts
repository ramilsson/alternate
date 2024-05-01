declare global {
  namespace PrismaJson {
    interface Field {
      type: 'literal';
      value: unknown;
    }
  }
}
