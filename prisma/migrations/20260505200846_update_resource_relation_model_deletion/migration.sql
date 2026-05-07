-- DropForeignKey
ALTER TABLE "ResourceRelation" DROP CONSTRAINT "ResourceRelation_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceRelation" DROP CONSTRAINT "ResourceRelation_targetResourceId_fkey";

-- AddForeignKey
ALTER TABLE "ResourceRelation" ADD CONSTRAINT "ResourceRelation_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceRelation" ADD CONSTRAINT "ResourceRelation_targetResourceId_fkey" FOREIGN KEY ("targetResourceId") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;
