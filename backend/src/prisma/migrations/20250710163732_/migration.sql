/*
  Warnings:

  - Made the column `courseId` on table `Lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lessonId` on table `Note` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_lessonId_fkey";

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "courseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "lessonId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
