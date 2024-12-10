import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendenceDto {
  @ApiProperty({
    required: true,
  })
  class_id: number;

  @ApiProperty({
    required: true,
  })
  student_id: number;

  @ApiProperty({
    required: true,
    enum: ['PRESENT', 'ABSENT', 'LATE'],
  })
  attendence_status: 'PRESENT' | 'ABSENT' | 'LATE';

  @ApiProperty({
    required: true,
  })
  attendence_date: Date;
}
