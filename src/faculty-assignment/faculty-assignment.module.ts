import { Module } from '@nestjs/common';
import { FacultyAssignmentService } from './faculty-assignment.service';
import { FacultyAssignmentController } from './faculty-assignment.controller';

@Module({
  controllers: [FacultyAssignmentController],
  providers: [FacultyAssignmentService],
})
export class FacultyAssignmentModule {}
