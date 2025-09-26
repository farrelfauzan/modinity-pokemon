import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { TeamEntity } from '../entities/team.entity';

export interface ITeamService {
  create(options: CreateTeamDto): Promise<{
    data: TeamEntity;
  }>;
  update(id: number, options: UpdateTeamDto): Promise<{ data: TeamEntity }>;
  findAll(): Promise<{ data: TeamEntity[] }>;
  findOne(id: number): Promise<{
    data: TeamEntity;
  }>;
  removePokemonFromTeam(
    id: number,
    pokemonName: string,
  ): Promise<{ data: TeamEntity }>;
  remove(id: number): Promise<{
    data: {
      message: string;
    };
  }>;
}
