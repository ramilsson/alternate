-- CreateEnum
CREATE TYPE "AttributeType" AS ENUM ('LITERAL_NUMBER', 'LITERAL_STRING', 'LITERAL_BOOLEAN', 'LITERAL_JSON');

-- CreateTable
CREATE TABLE "Attribute" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "resourceId" UUID NOT NULL,
    "type" "AttributeType" NOT NULL DEFAULT 'LITERAL_STRING',
    "name" VARCHAR(64) NOT NULL,
    "value" TEXT,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_resourceId_name_key" ON "Attribute"("resourceId", "name");

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
