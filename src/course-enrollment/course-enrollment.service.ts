import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPaginationQuery } from 'src/utils/pagination/query.dto';
import { CreateCourseEnrollmentDto } from './dto/create-course-enrollment.dto';
import { UpdateCourseEnrollmentDto } from './dto/update-course-enrollment.dto';

@Injectable()
export class CourseEnrollmentService {
  constructor(private prisma: PrismaService) {}
  private section_enrollment_default_select: Prisma.CourseSectionEnrollmentSelect =
    {
      id: true,
      section_id: true,
      user_id: true,
      user: {
        select: {
          id: true,
          email: true,
          username: true,
          user_role: true,
          is_active: true,
          created_at: true,
          updated_at: true,
        },
      },
      enrollment_status: true,
      section: {
        select: {
          id: true,
          course_id: true,
          section_title: true,
          section_description: true,
          section_total_seats: true,
          _count: {
            select: {
              course_section_student_enrollments: true,
              course_section_faculty_assignments: true,
            },
          },
          created_at: true,
          updated_at: true,
        },
      },
      created_at: true,
      updated_at: true,
    };
  async create(createCourseEnrollmentDto: CreateCourseEnrollmentDto) {
    const { section_id, user_id, enrollment_status } =
      createCourseEnrollmentDto;
    try {
      const section_enrollment =
        await this.prisma.courseSectionEnrollment.create({
          data: {
            section_id,
            user_id,
            enrollment_status,
          },
        });
      return {
        message: 'Course Section Enrollment is successfully',
        section_enrollment,
      };
    } catch (error) {
      throw new BadRequestException(error?.meta?.cause || error);
    }
  }

  async findAll(
    { limit = 10, page = 0 }: IPaginationQuery,
    enrollment_status?: 'PENDING' | 'ENROLLED' | 'DROPPED' | 'COMPLETED',
    section_id?: number,
    user_id?: number,
  ) {
    const query: Prisma.CourseSection$course_section_student_enrollmentsArgs = {
      where: {
        AND: [
          {
            enrollment_status: {
              equals: enrollment_status,
            },
          },
        ],
      },
      take: limit,
      skip: page * limit,
      select: this.section_enrollment_default_select,
    };

    if (section_id) {
      query.where.section_id = section_id; // Filter by section id
    }
    if (user_id) {
      query.where.user_id = user_id; // Filter by user id
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.courseSectionEnrollment.findMany(query),
      this.prisma.courseSectionEnrollment.count({ where: query.where }),
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
      throw new BadRequestException('Please provide a valid id');
    }
    const data = await this.prisma.courseSectionEnrollment.findUnique({
      where: {
        id,
      },
      select: this.section_enrollment_default_select,
    });
    if (!data) throw new NotFoundException('Enrollment not found');

    return {
      message: `Enrollment with id: ${id}`,
      data,
    };
  }

  async update(
    id: number,
    updateCourseEnrollmentDto: UpdateCourseEnrollmentDto,
  ) {
    if (!id) {
      throw new BadRequestException('Please provide a valid id');
    }
    const { section_id, user_id, enrollment_status } =
      updateCourseEnrollmentDto;
    try {
      const data = await this.prisma.courseSectionEnrollment.update({
        where: {
          id,
        },
        data: {
          section_id,
          user_id,
          enrollment_status,
        },
        select: this.section_enrollment_default_select,
      });
      return {
        message: `Enrollment with id: ${id} updated successfully`,
        data,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('Enrollment not found');
      } else {
        throw new BadRequestException(error?.meta?.cause || error);
      }
    }

    return `This action updates a #${id} courseEnrollment`;
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException('Please provide a valid id');
    }

    try {
      const data = await this.prisma.courseSectionEnrollment.delete({
        where: {
          id,
        },
        select: this.section_enrollment_default_select,
      });
      return {
        message: `Enrollment with id: ${id} deleted successfully`,
        data,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException('Enrollment not found');
      } else {
        throw new BadRequestException(error?.meta?.cause || error);
      }
    }
    return `This action removes a #${id} courseEnrollment`;
  }
}
