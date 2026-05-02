declare global {
  namespace PrismaJson {
    type ResourcePayload = Record<string, unknown>;
    type ResourcePayloadSchema = Record<string, unknown>;
  }
}

export {};
