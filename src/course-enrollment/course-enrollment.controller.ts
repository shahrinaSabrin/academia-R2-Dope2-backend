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
import { ApiQuery } from '@nestjs/swagger';
import {
  IPaginationQuery,
  LimitQuery,
  PageQuery,
  SearchQuery,
} from 'src/utils/pagination/query.dto';
import { CourseEnrollmentService } from './course-enrollment.service';
import { CreateCourseEnrollmentDto } from './dto/create-course-enrollment.dto';
import { UpdateCourseEnrollmentDto } from './dto/update-course-enrollment.dto';

@Controller('course-enrollment')
export class CourseEnrollmentController {
  constructor(
    private readonly courseEnrollmentService: CourseEnrollmentService,
  ) {}

  @Post()
  create(@Body() createCourseEnrollmentDto: CreateCourseEnrollmentDto) {
    return this.courseEnrollmentService.create(createCourseEnrollmentDto);
  }

  @Get()
  @ApiQuery({
    name: 'enrollment_status',
    enum: ['PENDING', 'ENROLLED', '  DROPPED', 'COMPLETED'],
    required: false,
  })
  @ApiQuery({
    name: 'section_id',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'user_id',
    type: 'number',
    required: false,
  })
  @ApiQuery(PageQuery) // PageQuery, reusing the PageQuery from the pagination query
  @ApiQuery(LimitQuery) // LimitQuery, reusing the LimitQuery from the pagination query
  @ApiQuery(SearchQuery)
  findAll(
    @Query() query: IPaginationQuery,
    @Query('enrollment_status')
    enrollment_status?: 'PENDING' | 'ENROLLED' | 'DROPPED' | 'COMPLETED',
    @Query('section_id') section_id?: number,
    @Query('user_id') user_id?: number,
  ) {
    return this.courseEnrollmentService.findAll(
      query,
      enrollment_status,
      +section_id,
      +user_id,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseEnrollmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseEnrollmentDto: UpdateCourseEnrollmentDto,
  ) {
    return this.courseEnrollmentService.update(+id, updateCourseEnrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseEnrollmentService.remove(+id);
  }
}
