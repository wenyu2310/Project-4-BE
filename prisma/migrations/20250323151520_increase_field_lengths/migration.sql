/*
  Warnings:

  - You are about to drop the column `PPId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `PPId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the `PartnershipProposals` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `PId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_PPId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_PPId_fkey";

-- DropForeignKey
ALTER TABLE "PartnershipProposals" DROP CONSTRAINT "PartnershipProposals_parkId_fkey";

-- DropForeignKey
ALTER TABLE "PartnershipProposals" DROP CONSTRAINT "PartnershipProposals_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "PPId",
ADD COLUMN     "PId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "PPId",
ADD COLUMN     "PId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PartnershipProposals";

-- CreateTable
CREATE TABLE "proposals" (
    "id" SERIAL NOT NULL,
    "subject" VARCHAR(250) NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "parkId" INTEGER NOT NULL,

    CONSTRAINT "proposals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "parks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_PId_fkey" FOREIGN KEY ("PId") REFERENCES "proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_PId_fkey" FOREIGN KEY ("PId") REFERENCES "proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
