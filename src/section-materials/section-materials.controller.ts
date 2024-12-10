import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SectionMaterialsService } from './section-materials.service';
import { CreateSectionMaterialDto } from './dto/create-section-material.dto';
import { UpdateSectionMaterialDto } from './dto/update-section-material.dto';

@Controller('section-materials')
export class SectionMaterialsController {
  constructor(
    private readonly sectionMaterialsService: SectionMaterialsService,
  ) {}

  @Post()
  create(@Body() createSectionMaterialDto: CreateSectionMaterialDto) {
    return this.sectionMaterialsService.create(createSectionMaterialDto);
  }

  @Get()
  findAll() {
    return this.sectionMaterialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionMaterialsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSectionMaterialDto: UpdateSectionMaterialDto,
  ) {
    return this.sectionMaterialsService.update(+id, updateSectionMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionMaterialsService.remove(+id);
  }
}
