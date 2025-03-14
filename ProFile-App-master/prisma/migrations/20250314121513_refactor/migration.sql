/*
  Warnings:

  - You are about to drop the `JobOffer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `postSeeking` on the `User` table. All the data in the column will be lost.
  - Added the required column `address` to the `Cv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Cv` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Cv` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photoUrl` on table `Cv` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postSeeking` on table `Cv` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "JobOffer";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Emploi" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobTitle" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "locationJob" TEXT NOT NULL,
    "typeJob" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "salary" TEXT,
    "datePublished" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'En attente',
    "userId" TEXT NOT NULL,
    CONSTRAINT "Emploi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Candidature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cvId" TEXT NOT NULL,
    "emploiId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En attente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Candidature_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidature_emploiId_fkey" FOREIGN KEY ("emploiId") REFERENCES "Emploi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cv" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "linkedin" TEXT,
    "address" TEXT NOT NULL,
    "postSeeking" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Cv_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cv" ("createdAt", "description", "email", "fullName", "id", "pdfUrl", "photoUrl", "postSeeking", "updatedAt", "userId") SELECT "createdAt", "description", "email", "fullName", "id", "pdfUrl", "photoUrl", "postSeeking", "updatedAt", "userId" FROM "Cv";
DROP TABLE "Cv";
ALTER TABLE "new_Cv" RENAME TO "Cv";
CREATE UNIQUE INDEX "Cv_userId_key" ON "Cv"("userId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CANDIDAT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "fullName", "id", "updatedAt") SELECT "createdAt", "email", "fullName", "id", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
