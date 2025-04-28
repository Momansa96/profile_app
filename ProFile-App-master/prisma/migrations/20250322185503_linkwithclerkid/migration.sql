/*
  Warnings:

  - You are about to drop the column `userId` on the `Favorite` table. All the data in the column will be lost.
  - Added the required column `clerkId` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "userId",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
