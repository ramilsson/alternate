declare global {
  namespace PrismaJson {
    type ResourcePayload = Record<string, unknown>;
  }
}

export {};
