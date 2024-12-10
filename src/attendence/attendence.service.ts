import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAttendenceDto } from './dto/create-attendence.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AttendenceService {
  constructor(private prisma: PrismaService) {}
  private attendence_default_select: Prisma.AttendenceSelect = {
    id: true,
    class: {
      select: {
        class_title: true,
        class_date: true,
      },
    },
    attendence_date: true,
    attendence_status: true,
    student: {
      select: {
        id: true,
        username: true,
        profile: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    },
  };

  async create(createAttendenceDto: CreateAttendenceDto) {
    const { class_id, student_id, attendence_date, attendence_status } =
      createAttendenceDto;

    try {
      const data = await this.prisma.attendence.create({
        data: {
          class_id,
          student_id,
          attendence_date,
          attendence_status,
        },
        select: this.attendence_default_select,
      });

      return {
        message: 'Attendence created successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error?.meta?.cause || error);
    }
  }

  async findAll(class_id?: number, student_id?: number) {
    const query: Prisma.AttendenceFindManyArgs = {
      select: this.attendence_default_select,
    };

    if (class_id) {
      query.where = {
        class_id,
      };
    }

    if (student_id) {
      query.where = {
        student_id,
      };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.attendence.findMany(query),
      this.prisma.attendence.count({
        where: query.where,
      }),
    ]);

    return {
      data,
      total,
    };
  }
}
