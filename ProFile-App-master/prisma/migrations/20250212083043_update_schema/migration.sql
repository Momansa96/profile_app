/*
  Warnings:

  - You are about to drop the column `address` on the `CV` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `CV` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CV" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photoUrl" TEXT,
    "postSeeking" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CV_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CV" ("createdAt", "description", "email", "fullName", "id", "photoUrl", "postSeeking", "updatedAt", "userId") SELECT "createdAt", "description", "email", "fullName", "id", "photoUrl", "postSeeking", "updatedAt", "userId" FROM "CV";
DROP TABLE "CV";
ALTER TABLE "new_CV" RENAME TO "CV";
CREATE UNIQUE INDEX "CV_userId_key" ON "CV"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
