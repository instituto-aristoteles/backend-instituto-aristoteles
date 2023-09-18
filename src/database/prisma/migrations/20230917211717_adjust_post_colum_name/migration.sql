/*
  Warnings:

  - You are about to drop the column `createdat` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `createdbyid` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedbyid` on the `Post` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdbyid_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_updatedbyid_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "createdat",
DROP COLUMN "createdbyid",
DROP COLUMN "updatedat",
DROP COLUMN "updatedbyid",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedById" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
