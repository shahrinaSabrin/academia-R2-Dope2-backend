import { Module } from '@nestjs/common';
import { SectionMaterialsService } from './section-materials.service';
import { SectionMaterialsController } from './section-materials.controller';

@Module({
  controllers: [SectionMaterialsController],
  providers: [SectionMaterialsService],
})
export class SectionMaterialsModule {}
