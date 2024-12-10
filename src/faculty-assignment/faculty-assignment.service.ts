import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPaginationQuery } from 'src/utils/pagination/query.dto';
import { CreateFacultyAssignmentDto } from './dto/create-faculty-assignment.dto';
import { UpdateFacultyAssignmentDto } from './dto/update-faculty-assignment.dto';

@Injectable()
export class FacultyAssignmentService {
  constructor(private prisma: PrismaService) {}
  // private course_section_faculty_assignment_default_select : Prisma.coursesectionfacultyaddignm  = {

  // }
  async create(createFacultyAssignmentDto: CreateFacultyAssignmentDto) {
    const { section_id, faculty_id, faculty_role } = createFacultyAssignmentDto;
    try {
      const course_section_faculty_assignment =
        await this.prisma.courseSectionFacultyAssignment.create({
          data: {
            section_id,
            faculty_id,
            faculty_role,
          },
        });
      return {
        message: 'Faculty Assignment is successfully',
        course_section_faculty_assignment,
      };
    } catch (error) {
      throw new BadRequestException(error?.meta?.cause || error);
    }
  }

  async findAll(
    { limit = 10, page = 0 }: IPaginationQuery,
    section_id?: number,
    faculty_id?: number,
    faculty_role?: 'INSTRUCTOR' | 'TEACHING_ASSISTANT',
  ) {
    const query: Prisma.CourseSection$course_section_faculty_assignmentsArgs = {
      where: {
        AND: [
          {
            faculty_role: {
              equals: faculty_role,
            },
          },
        ],
      },
      take: limit,
      skip: page * limit,
      include: {
        faculty: {
          select: {
            id: true,
            username: true,
            email: true,
            user_role: true,
            profile: true,
          },
        },
        section: true,
      },
    };
    if (section_id) {
      query.where.section_id = section_id;
    }
    if (section_id) {
      query.where.section_id = section_id;
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.courseSectionFacultyAssignment.findMany(query),
      this.prisma.courseSectionFacultyAssignment.count({ where: query.where }),
    ]);

    return {
      data,
      total,
      limit,
      page,
    };
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('Please provide a valid course id');
    }
    const data = await this.prisma.courseSectionFacultyAssignment.findUnique({
      where: {
        id,
      },
      include: {
        faculty: {
          select: {
            id: true,
            username: true,
            email: true,
            user_role: true,
            profile: true,
          },
        },
        section: true,
      },
    });
    if (!data) throw new NotFoundException('Course not found');
    return data;
  }

  async update(
    id: number,
    updateFacultyAssignmentDto: UpdateFacultyAssignmentDto,
  ) {
    if (!id) {
      throw new BadRequestException('Please provide a valid id');
    }
    const { section_id, faculty_id, faculty_role } = updateFacultyAssignmentDto;
    try {
      const data = await this.prisma.courseSectionFacultyAssignment.update({
        where: {
          id,
        },
        data: {
          section_id,
          faculty_id,
          faculty_role,
        },
      });
      return {
        message: `Faculty Assignment with id: ${id} updated successfully`,
        data,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('Faculty Assignment not found');
      } else {
        throw new BadRequestException(error?.meta?.cause || error);
      }
    }

    return `This action updates a #${id} facultyAssignment`;
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException('Please provide a valid id');
    }

    try {
      const data = await this.prisma.courseSectionFacultyAssignment.delete({
        where: {
          id,
        },
      });
      return {
        message: `Faculty Assignment with id: ${id} deleted successfully`,
        data,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('Faculty Assignment not found');
      } else {
        throw new BadRequestException(error?.meta?.cause || error);
      }
    }
  }
}
