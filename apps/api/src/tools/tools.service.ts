import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateToolDto } from './dto/create-tool.dto';

@Injectable()
export class ToolsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateToolDto) {
    const { name, description, url, categoryId } = data;
    
    // Verificar se a categoria existe
    const categoryExists = await this.prisma.client.category.findUnique({
      where: { id: categoryId },
    });
    if (!categoryExists) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.client.tool.create({
      data: {
        name,
        description,
        url,
        categoryId,
      },
      include: {
        category: true,
      },
    } as any);
  }

  async findAll(search?: string, categoryId?: string) {
    const where: any = {};

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.client.tool.findMany({
      where,
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    const tool = await this.prisma.client.tool.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!tool) {
      throw new NotFoundException('Tool not found');
    }

    return tool;
  }

  async remove(id: string) {
    // Verificar se existe antes de deletar
    await this.findOne(id);
    
    return this.prisma.client.tool.delete({
      where: { id },
    });
  }
}
