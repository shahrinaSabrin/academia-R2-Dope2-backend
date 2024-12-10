import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseEnrollmentDto {
  @ApiProperty({
    required: false,
  })
  section_id: number;
  @ApiProperty({
    required: false,
  })
  user_id: number;

  @ApiProperty({
    required: false,
    enum: ['PENDING', 'ENROLLED', '  DROPPED', 'COMPLETED'],
    default: 'PENDING',
  })
  enrollment_status: 'PENDING' | 'ENROLLED' | 'DROPPED' | 'COMPLETED';
}
