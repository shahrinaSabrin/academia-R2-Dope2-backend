/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_section_id_fkey";

-- DropTable
DROP TABLE "Class";

-- CreateTable
CREATE TABLE "Classes" (
    "id" SERIAL NOT NULL,
    "section_id" INTEGER NOT NULL,
    "class_title" TEXT NOT NULL,
    "class_date" TIMESTAMP(3) NOT NULL,
    "class_duration" INTEGER NOT NULL,
    "class_location" TEXT NOT NULL,
    "class_status" "ClassStatus" NOT NULL DEFAULT 'PLANNED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "CourseSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
