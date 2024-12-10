import { ApiProperty } from '@nestjs/swagger';
export class CreateFacultyAssignmentDto {
  @ApiProperty({
    required: true,
  })
  section_id: number;

  @ApiProperty({
    required: true,
  })
  faculty_id: number;

  @ApiProperty({
    required: true,
    enum: ['INSTRUCTOR', 'TEACHING_ASSISTANT'],
  })
  faculty_role: 'INSTRUCTOR' | 'TEACHING_ASSISTANT';
}
