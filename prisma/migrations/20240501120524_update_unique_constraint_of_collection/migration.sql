/*
  Warnings:

  - A unique constraint covering the columns `[projectId,name]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Collection_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Collection_projectId_name_key" ON "Collection"("projectId", "name");
