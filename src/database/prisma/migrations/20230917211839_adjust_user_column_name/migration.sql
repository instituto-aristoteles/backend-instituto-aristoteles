/*
  Warnings:

  - You are about to drop the column `createdat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdat",
DROP COLUMN "updatedat",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
