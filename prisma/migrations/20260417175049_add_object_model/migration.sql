-- CreateEnum
CREATE TYPE "ObjectStatus" AS ENUM ('DRAFT', 'UPLOADED');

-- CreateTable
CREATE TABLE "Object" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fileName" VARCHAR(64) NOT NULL,
    "resourceId" UUID NOT NULL,
    "status" "ObjectStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Object_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Object_resourceId_fileName_key" ON "Object"("resourceId", "fileName");

-- AddForeignKey
ALTER TABLE "Object" ADD CONSTRAINT "Object_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
