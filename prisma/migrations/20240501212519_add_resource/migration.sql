-- CreateTable
CREATE TABLE "Resource" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "collectionId" UUID NOT NULL,
    "fields" JSONB[],

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
