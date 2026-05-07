-- CreateTable
CREATE TABLE "ResourceRelation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(64) NOT NULL,
    "resourceId" UUID,
    "targetResourceId" UUID,

    CONSTRAINT "ResourceRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResourceRelation_resourceId_targetResourceId_key" ON "ResourceRelation"("resourceId", "targetResourceId");

-- AddForeignKey
ALTER TABLE "ResourceRelation" ADD CONSTRAINT "ResourceRelation_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceRelation" ADD CONSTRAINT "ResourceRelation_targetResourceId_fkey" FOREIGN KEY ("targetResourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
