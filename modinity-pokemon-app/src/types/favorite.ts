import { BaseResponse } from "./common";

export interface Favorite {
  id: number;
  pokemonName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface CreateFavoriteDto {
  pokemonName: string;
}

export interface UpdateFavoriteDto {
  pokemonName?: string;
}

export interface DeleteFavoriteDto {
  id: number;
}

export type FavoritesResponse = BaseResponse<Favorite[]>;
export type FavoriteResponse = BaseResponse<Favorite>;
export type CreateFavoriteResponse = BaseResponse<Favorite>;
export type UpdateFavoriteResponse = BaseResponse<Favorite>;
export type DeleteFavoriteResponse = BaseResponse<{
  message: string;
}>;
