import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IPaginationQuery } from 'src/utils/pagination/query.dto';

import { ApiQuery } from '@nestjs/swagger';
import { CreateFacultyAssignmentDto } from './dto/create-faculty-assignment.dto';
import { UpdateFacultyAssignmentDto } from './dto/update-faculty-assignment.dto';
import { FacultyAssignmentService } from './faculty-assignment.service';

@Controller('faculty-assignment')
export class FacultyAssignmentController {
  constructor(
    private readonly facultyAssignmentService: FacultyAssignmentService,
  ) {}

  @Post()
  create(@Body() createFacultyAssignmentDto: CreateFacultyAssignmentDto) {
    return this.facultyAssignmentService.create(createFacultyAssignmentDto);
  }

  @Get()
  @ApiQuery({ name: 'section_id', required: false, type: 'number' })
  @ApiQuery({ name: 'faculty_id', required: false, type: 'number' })
  @ApiQuery({
    name: 'faculty_role',
    required: false,
    enum: ['INSTRUCTOR', 'TEACHING_ASSISTANT'],
  })
  findAll(
    @Query() query: IPaginationQuery,
    @Query('section_id') section_id?: number,
    @Query('faculty_id') faculty_id?: number,
    @Query('faculty_role') faculty_role?: 'INSTRUCTOR' | 'TEACHING_ASSISTANT',
  ) {
    return this.facultyAssignmentService.findAll(
      query,
      +section_id,
      +faculty_id,
      faculty_role,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facultyAssignmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFacultyAssignmentDto: UpdateFacultyAssignmentDto,
  ) {
    return this.facultyAssignmentService.update(
      +id,
      updateFacultyAssignmentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facultyAssignmentService.remove(+id);
  }
}
