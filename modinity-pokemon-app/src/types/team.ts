import { BaseResponse } from "./common";

export interface Team {
  id: number;
  name: string;
  pokemons: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface CreateTeamDto {
  name: string;
  pokemons: string[];
}

export interface UpdateTeamDto {
  id: number;
  name?: string;
  pokemons?: string[];
}

export interface DeleteTeamDto {
  id: number;
}

export type TeamsResponse = BaseResponse<Team[]>;
export type TeamResponse = BaseResponse<Team>;
export type CreateTeamResponse = BaseResponse<Team>;
export type UpdateTeamResponse = BaseResponse<Team>;
export type DeleteTeamResponse = BaseResponse<{
  message: string;
}>;
