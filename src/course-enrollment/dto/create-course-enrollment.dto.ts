import { ApiProperty } from '@nestjs/swagger';
export class CreateCourseEnrollmentDto {
  @ApiProperty({
    required: true,
  })
  section_id: number;

  @ApiProperty({
    required: true,
  })
  user_id: number;

  @ApiProperty({
    required: true,
    enum: ['PENDING', 'ENROLLED', '  DROPPED', 'COMPLETED'],
    default: 'PENDING',
  })
  enrollment_status: 'PENDING' | 'ENROLLED' | 'DROPPED' | 'COMPLETED';
  //   enrollment_status: string;
}
