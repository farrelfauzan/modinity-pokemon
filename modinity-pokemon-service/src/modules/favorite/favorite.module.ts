import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { FavoriteEntity } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEntity])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
