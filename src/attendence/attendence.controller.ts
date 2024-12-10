import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AttendenceService } from './attendence.service';
import { CreateAttendenceDto } from './dto/create-attendence.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('attendence')
export class AttendenceController {
  constructor(private readonly attendenceService: AttendenceService) {}

  @Post()
  create(@Body() createAttendenceDto: CreateAttendenceDto) {
    return this.attendenceService.create(createAttendenceDto);
  }

  @Get()
  @ApiQuery({
    name: 'class_id',
    required: false,
  })
  @ApiQuery({
    name: 'student_id',
    required: false,
  })
  findAll(
    @Query('class_id') class_id?: number,
    @Query('student_id') student_id?: number,
  ) {
    return this.attendenceService.findAll(+class_id, +student_id);
  }
}