import { PartialType } from '@nestjs/swagger';
import { CreateFacultyAssignmentDto } from './create-faculty-assignment.dto';

export class UpdateFacultyAssignmentDto extends PartialType(
  CreateFacultyAssignmentDto,
) {}
