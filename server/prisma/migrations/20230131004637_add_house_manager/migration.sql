/*
  Warnings:

  - You are about to drop the column `house_manager` on the `House` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "House" DROP COLUMN "house_manager";

-- CreateTable
CREATE TABLE "_houses_managed" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_houses_managed_AB_unique" ON "_houses_managed"("A", "B");

-- CreateIndex
CREATE INDEX "_houses_managed_B_index" ON "_houses_managed"("B");

-- AddForeignKey
ALTER TABLE "_houses_managed" ADD CONSTRAINT "_houses_managed_A_fkey" FOREIGN KEY ("A") REFERENCES "House"("house_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_houses_managed" ADD CONSTRAINT "_houses_managed_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
