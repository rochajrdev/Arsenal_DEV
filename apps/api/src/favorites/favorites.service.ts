import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async favorite(userId: string, toolId: string) {
    // 1. Verificar se a ferramenta existe
    const tool = await this.prisma.client.tool.findUnique({
      where: { id: toolId },
    });
    if (!tool) {
      throw new NotFoundException('Tool not found');
    }

    // 2. Verificar se já está favoritada
    const existing = await this.prisma.client.favorite.findUnique({
      where: {
        userId_toolId: {
          userId,
          toolId,
        },
      },
    });
    if (existing) {
      throw new ConflictException('Tool is already favorited by this user');
    }

    // 3. Criar favorito
    return this.prisma.client.favorite.create({
      data: {
        userId,
        toolId,
      },
      include: {
        tool: {
          include: {
            category: true,
          },
        },
      },
    } as any);
  }

  async unfavorite(userId: string, toolId: string) {
    // 1. Verificar se a relação de favorito existe
    const favorite = await this.prisma.client.favorite.findUnique({
      where: {
        userId_toolId: {
          userId,
          toolId,
        },
      },
    });
    if (!favorite) {
      throw new NotFoundException('Favorite relation not found');
    }

    // 2. Deletar favorito
    return this.prisma.client.favorite.delete({
      where: {
        userId_toolId: {
          userId,
          toolId,
        },
      },
    });
  }

  async findAllUserFavorites(userId: string) {
    const favorites = await this.prisma.client.favorite.findMany({
      where: { userId },
      include: {
        tool: {
          include: {
            category: true,
          },
        },
      },
    });

    // Mapear para retornar diretamente as ferramentas favoritadas de forma limpa
    return favorites.map((f) => f.tool);
  }
}
