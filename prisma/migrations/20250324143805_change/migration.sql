/*
  Warnings:

  - You are about to drop the `MailingList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MailingList" DROP CONSTRAINT "MailingList_parkId_fkey";

-- DropForeignKey
ALTER TABLE "MailingList" DROP CONSTRAINT "MailingList_userId_fkey";

-- DropTable
DROP TABLE "MailingList";

-- CreateTable
CREATE TABLE "mailingList" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "parkId" INTEGER NOT NULL,

    CONSTRAINT "mailingList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mailingList" ADD CONSTRAINT "mailingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mailingList" ADD CONSTRAINT "mailingList_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "parks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
