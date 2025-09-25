-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "courseId" TEXT;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
