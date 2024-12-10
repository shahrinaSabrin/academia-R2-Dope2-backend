import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSectionMaterialDto } from './dto/create-section-material.dto';
import { UpdateSectionMaterialDto } from './dto/update-section-material.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SectionMaterialsService {
  constructor(private prisma: PrismaService) {}
  async create(createSectionMaterialDto: CreateSectionMaterialDto) {
    const {
      section_id,
      material_title,
      material_description,
      material_url,
      material_type,
    } = createSectionMaterialDto;

    try {
      const data = await this.prisma.courseSectionMaterial.create({
        data: {
          section_id,
          material_title,
          material_description,
          material_url,
          material_type,
        },
      });

      return {
        message: 'Section material created successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error?.meta?.cause || error);
    }
  }

  async findAll(section_id?: number) {
    const query: Prisma.CourseSectionMaterialFindManyArgs = {};

    if (section_id) {
      query.where = {
        section_id,
      };
    }

    return {
      message: 'Section materials retrieved successfully',
      data: await this.prisma.courseSectionMaterial.findMany(query),
    };
  }

  async findOne(id: number) {
    if (!id) throw new BadRequestException('Section material ID is required');

    const data = await this.prisma.courseSectionMaterial.findUnique({
      where: {
        id,
      },
    });

    if (!data) throw new BadRequestException('Section material not found');

    return {
      message: `Section material with ID: ${id}`,
      data,
    };
  }

  async update(id: number, updateSectionMaterialDto: UpdateSectionMaterialDto) {
    if (!id) throw new BadRequestException('Section material ID is required');

    const {
      material_title,
      material_description,
      material_url,
      material_type,
    } = updateSectionMaterialDto;

    try {
      const data = await this.prisma.courseSectionMaterial.update({
        where: {
          id,
        },
        data: {
          material_title,
          material_description,
          material_url,
          material_type,
        },
      });

      return {
        message: `Section material with ID: ${id} updated successfully`,
        data,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Material not found');
      } else {
        throw new BadRequestException(error?.meta?.cause || error);
      }
    }
  }

  async remove(id: number) {
    if (!id) throw new BadRequestException('Section material ID is required');

    try {
      await this.prisma.courseSectionMaterial.delete({
        where: {
          id,
        },
      });

      return {
        message: `Section material with ID: ${id} deleted successfully`,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Material not found');
      } else {
        throw new BadRequestException(error?.meta?.cause || error);
      }
    }
  }
}
