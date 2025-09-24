import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { UpdateFavoriteDto } from '../dto/update-favorite.dto';
import { FavoriteEntity } from '../entities/favorite.entity';

export interface IFavoriteService {
  create(options: CreateFavoriteDto): Promise<{
    data: FavoriteEntity;
  }>;
  findAll(): Promise<{ data: FavoriteEntity[] }>;
  findOne(id: number): Promise<{
    data: FavoriteEntity;
  }>;
  remove(id: number): Promise<{
    data: {
      message: string;
    };
  }>;
}
