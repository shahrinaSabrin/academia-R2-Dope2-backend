-- CreateEnum
CREATE TYPE "ClassStatus" AS ENUM ('PLANNED', 'ONGOING', 'COMPLETED');

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "section_id" INTEGER NOT NULL,
    "class_title" TEXT NOT NULL,
    "class_date" TIMESTAMP(3) NOT NULL,
    "class_duration" INTEGER NOT NULL,
    "class_location" TEXT NOT NULL,
    "class_status" "ClassStatus" NOT NULL DEFAULT 'PLANNED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "CourseSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
