import { ApiProperty } from '@nestjs/swagger';

export class CreateSectionMaterialDto {
  @ApiProperty({
    required: true,
  })
  section_id: number;

  @ApiProperty({
    required: true,
  })
  material_title: string;

  @ApiProperty({
    required: false,
  })
  material_description?: string;

  @ApiProperty({
    required: true,
  })
  material_url: string;

  @ApiProperty({
    required: true,
    enum: ['FILE', 'IMAGE', 'VIDEO', 'LINK'],
  })
  material_type: 'FILE' | 'IMAGE' | 'VIDEO' | 'LINK';
}
