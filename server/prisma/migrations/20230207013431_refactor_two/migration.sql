/*
  Warnings:

  - You are about to drop the `HouseWithUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HouseWithUsers" DROP CONSTRAINT "HouseWithUsers_houseId_fkey";

-- DropForeignKey
ALTER TABLE "HouseWithUsers" DROP CONSTRAINT "HouseWithUsers_userId_fkey";

-- AlterTable
ALTER TABLE "House" ADD COLUMN     "ownerId" TEXT;

-- DropTable
DROP TABLE "HouseWithUsers";

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
