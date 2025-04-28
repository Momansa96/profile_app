-- CreateTable
CREATE TABLE "RecruterFavorite" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecruterFavorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecruterFavorite" ADD CONSTRAINT "RecruterFavorite_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruterFavorite" ADD CONSTRAINT "RecruterFavorite_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
