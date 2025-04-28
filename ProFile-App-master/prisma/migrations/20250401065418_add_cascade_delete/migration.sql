-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_cvId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_experienceId_fkey";

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
