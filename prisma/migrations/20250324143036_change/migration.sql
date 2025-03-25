/*
  Warnings:

  - You are about to drop the column `PId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `PId` on the `Like` table. All the data in the column will be lost.
  - Added the required column `proposalId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proposalId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_PId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_PId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "PId",
ADD COLUMN     "proposalId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "PId",
ADD COLUMN     "proposalId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
