/*
  Warnings:

  - You are about to drop the column `cvId` on the `Candidature` table. All the data in the column will be lost.
  - Added the required column `clerkId` to the `Candidature` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Candidature" DROP CONSTRAINT "Candidature_cvId_fkey";

-- AlterTable
ALTER TABLE "Candidature" DROP COLUMN "cvId",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Candidature" ADD CONSTRAINT "Candidature_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidature" ADD CONSTRAINT "Candidature_clerkId_cv_fkey" FOREIGN KEY ("clerkId") REFERENCES "Cv"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
