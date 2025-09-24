import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { IFavoriteService } from './interface/favorite.interface';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoriteService implements IFavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
  ) {}

  async create(options: CreateFavoriteDto): Promise<{
    data: FavoriteEntity;
  }> {
    const checkExist = await this.favoriteRepository.findOne({
      where: { pokemonName: options.pokemonName },
    });

    if (checkExist) {
      throw new HttpException(
        'This pokemon is already in favorites',
        HttpStatus.CONFLICT,
      );
    }

    const favorite = this.favoriteRepository.create(options);

    await this.favoriteRepository.save(favorite);

    return {
      data: favorite,
    };
  }

  async findAll(): Promise<{
    data: FavoriteEntity[];
  }> {
    const data = await this.favoriteRepository.find();

    return {
      data,
    };
  }

  async findOne(id: number): Promise<{
    data: FavoriteEntity;
  }> {
    const favorite = await this.favoriteRepository.findOne({
      where: { id },
    });

    if (!favorite) {
      throw new HttpException('Favorite not found', HttpStatus.NOT_FOUND);
    }

    return {
      data: favorite,
    };
  }

  async remove(id: number): Promise<{
    data: {
      message: string;
    };
  }> {
    const { data: favorite } = await this.findOne(id);
    await this.favoriteRepository.remove(favorite);
    return {
      data: {
        message: 'Favorite removed from favorites successfully',
      },
    };
  }
}
