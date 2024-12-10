import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  private classes_default_select: Prisma.ClassesSelect = {
    id: true,
    section_id: true,
    class_title: true,
    class_date: true,
    class_duration: true,
    class_location: true,
    class_status: true,
    class_faculty_id: true,
    created_at: true,
    updated_at: true,
    class_faculty: {
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

  async create(createClassDto: CreateClassDto) {
    const {
      section_id,
      class_title,
      class_date,
      class_duration,
      class_location,
      class_status,
      faculty_id,
    } = createClassDto;

    try {
      const data = await this.prisma.classes.create({
        data: {
          section_id,
          class_title,
          class_date,
          class_duration,
          class_location,
          class_status,
          class_faculty_id: faculty_id,
        },
        select: this.classes_default_select,
      });
      return {
        message: 'Class created successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error?.meta?.cause || error);
    }
  }

  async findAll() {
    const query: Prisma.ClassesFindManyArgs = {
      select: this.classes_default_select,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.classes.findMany(query),
      this.prisma.classes.count({
        where: query.where,
      }),
    ]);

    return {
      data,
      total,
    };
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('Class ID is required');
    }

    const data = await this.prisma.classes.findUnique({
      where: {
        id,
      },
      select: this.classes_default_select,
    });

    if (!data) {
      throw new NotFoundException('Class not found');
    }

    return {
      message: `Class with ID: ${id}`,
      data,
    };
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    if (!id) {
      throw new BadRequestException('Class ID is required');
    }

    const {
      section_id,
      class_title,
      class_date,
      class_duration,
      class_location,
      class_status,
      faculty_id,
    } = updateClassDto;

    try {
      const data = await this.prisma.classes.update({
        where: {
          id,
        },
        data: {
          section_id,
          class_title,
          class_date,
          class_duration,
          class_location,
          class_status,
          class_faculty_id: faculty_id,
        },
        select: this.classes_default_select,
      });

      return {
        message: 'Class updated successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error?.meta?.cause || error);
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException('Class ID is required');
    }

    try {
      const data = await this.prisma.classes.delete({
        where: {
          id,
        },
      });

      return {
        message: 'Class deleted successfully',
        data,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('Class not found');
      } else {
        throw new BadRequestException(error?.meta?.cause || error);
      }
    }
  }
}
