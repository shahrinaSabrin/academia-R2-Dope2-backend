import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { SectionModule } from './section/section.module';
import { CourseEnrollmentModule } from './course-enrollment/course-enrollment.module';
import { FacultyAssignmentModule } from './faculty-assignment/faculty-assignment.module';
import { FilesModule } from './files/files.module';
import { SectionMaterialsModule } from './section-materials/section-materials.module';
import { ClassesModule } from './classes/classes.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    FilesModule,
    UsersModule,
    CoursesModule,
    SectionModule,
    CourseEnrollmentModule,
    FacultyAssignmentModule,
    SectionMaterialsModule,
    ClassesModule,
  ],
})
export class AppModule {}
