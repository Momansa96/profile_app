-- CreateTable
CREATE TABLE "JobOffer" (
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
    CONSTRAINT "JobOffer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
