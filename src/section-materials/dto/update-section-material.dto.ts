import { PartialType } from '@nestjs/swagger';
import { CreateSectionMaterialDto } from './create-section-material.dto';

export class UpdateSectionMaterialDto extends PartialType(
  CreateSectionMaterialDto,
) {}
