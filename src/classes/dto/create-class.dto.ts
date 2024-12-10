import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({
    required: true,
  })
  section_id: number;

  @ApiProperty({
    required: true,
  })
  class_title: string;

  @ApiProperty({
    required: true,
  })
  class_date: Date;

  @ApiProperty({
    required: true,
  })
  class_duration: number;

  @ApiProperty({
    required: true,
  })
  class_location: string;

  @ApiProperty({
    required: true,
    enum: ['PLANNED', 'ONGOING', 'COMPLETED'],
  })
  class_status: 'PLANNED' | 'ONGOING' | 'COMPLETED';
}
