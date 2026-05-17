import { Controller, Post, Delete, Get, Param, Request, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':toolId')
  favorite(@Request() req: any, @Param('toolId') toolId: string) {
    const userId = req.user.userId;
    return this.favoritesService.favorite(userId, toolId);
  }

  @Delete(':toolId')
  unfavorite(@Request() req: any, @Param('toolId') toolId: string) {
    const userId = req.user.userId;
    return this.favoritesService.unfavorite(userId, toolId);
  }

  @Get()
  findAll(@Request() req: any) {
    const userId = req.user.userId;
    return this.favoritesService.findAllUserFavorites(userId);
  }
}
