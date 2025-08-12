/*
  Warnings:

  - You are about to drop the column `url` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `activeLessonId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoId` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "activeLessonId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "url",
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "videoId" TEXT NOT NULL;
