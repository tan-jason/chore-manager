/*
  Warnings:

  - The primary key for the `House` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `house_id` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `house_name` on the `House` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Chore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HouseToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_chores_todo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_house_chores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_houses_managed` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `houseName` to the `House` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "_HouseToUser" DROP CONSTRAINT "_HouseToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_HouseToUser" DROP CONSTRAINT "_HouseToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_chores_todo" DROP CONSTRAINT "_chores_todo_A_fkey";

-- DropForeignKey
ALTER TABLE "_chores_todo" DROP CONSTRAINT "_chores_todo_B_fkey";

-- DropForeignKey
ALTER TABLE "_house_chores" DROP CONSTRAINT "_house_chores_A_fkey";

-- DropForeignKey
ALTER TABLE "_house_chores" DROP CONSTRAINT "_house_chores_B_fkey";

-- DropForeignKey
ALTER TABLE "_houses_managed" DROP CONSTRAINT "_houses_managed_A_fkey";

-- DropForeignKey
ALTER TABLE "_houses_managed" DROP CONSTRAINT "_houses_managed_B_fkey";

-- AlterTable
ALTER TABLE "House" DROP CONSTRAINT "House_pkey",
DROP COLUMN "house_id",
DROP COLUMN "house_name",
ADD COLUMN     "houseName" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "House_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Chore";

-- DropTable
DROP TABLE "_HouseToUser";

-- DropTable
DROP TABLE "_chores_todo";

-- DropTable
DROP TABLE "_house_chores";

-- DropTable
DROP TABLE "_houses_managed";

-- CreateTable
CREATE TABLE "HouseWithUsers" (
    "userId" TEXT NOT NULL,
    "houseId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HouseWithUsers_pkey" PRIMARY KEY ("userId","houseId")
);

-- AddForeignKey
ALTER TABLE "HouseWithUsers" ADD CONSTRAINT "HouseWithUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseWithUsers" ADD CONSTRAINT "HouseWithUsers_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
