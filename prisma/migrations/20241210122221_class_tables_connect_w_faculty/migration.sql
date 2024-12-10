/*
  Warnings:

  - Added the required column `class_faculty_id` to the `Classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classes" ADD COLUMN     "class_faculty_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_class_faculty_id_fkey" FOREIGN KEY ("class_faculty_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
