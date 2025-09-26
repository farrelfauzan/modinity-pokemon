import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { TeamEntity } from './entities/team.entity';
import { ITeamService } from './interface/team.interface';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService implements ITeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
  ) {}

  async create(options: CreateTeamDto): Promise<{ data: TeamEntity }> {
    let pokemonsLength = options.pokemons.length;

    const checkExist = await this.teamRepository.findOne({
      where: { name: options.name },
    });

    if (checkExist) {
      throw new HttpException(
        'This team name is already in use',
        HttpStatus.CONFLICT,
      );
    }

    const checkPokemonsLength = await this.teamRepository.findOne({
      where: { name: options.name },
    });

    pokemonsLength =
      options.pokemons.length +
      (checkPokemonsLength ? checkPokemonsLength.pokemons.length : 0);

    if (pokemonsLength > 6) {
      throw new HttpException(
        'A team can have a maximum of 6 pokemons',
        HttpStatus.BAD_REQUEST,
      );
    }

    const team = this.teamRepository.create(options);

    await this.teamRepository.save(team);

    return {
      data: team,
    };
  }

  async removePokemonFromTeam(
    id: number,
    pokemonName: string,
  ): Promise<{ data: TeamEntity }> {
    const team = await this.teamRepository.findOne({ where: { id } });

    if (!team) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
    }

    if (!team.pokemons.includes(pokemonName)) {
      throw new HttpException(
        'Pokemon not found in the team',
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedPokemons = team.pokemons.filter((p) => p !== pokemonName);
    team.pokemons = updatedPokemons;

    await this.teamRepository.save(team);

    return {
      data: team,
    };
  }

  async update(
    id: number,
    options: UpdateTeamDto,
  ): Promise<{ data: TeamEntity }> {
    const team = await this.teamRepository.findOne({ where: { id } });

    if (!team) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
    }

    const uniquePokemons = new Set(options.pokemons);
    if (uniquePokemons.size !== options.pokemons.length) {
      throw new HttpException(
        'Duplicate pokemons in the request',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingPokemons = team.pokemons || [];
    const duplicatePokemons = options.pokemons.filter((pokemon) =>
      existingPokemons.includes(pokemon),
    );

    if (duplicatePokemons.length > 0) {
      throw new HttpException(
        `Pokemon(s) already in team: ${duplicatePokemons.join(', ')}`,
        HttpStatus.CONFLICT,
      );
    }

    const totalPokemons = existingPokemons.length + options.pokemons.length;
    if (totalPokemons > 6) {
      throw new HttpException(
        'A team can have a maximum of 6 pokemons',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedPokemons = [...existingPokemons, ...options.pokemons];
    const updatedTeam = this.teamRepository.merge(team, {
      ...options,
      pokemons: updatedPokemons,
    });

    await this.teamRepository.save(updatedTeam);

    return {
      data: updatedTeam,
    };
  }

  async findAll(): Promise<{ data: TeamEntity[] }> {
    const data = await this.teamRepository.find();

    return {
      data,
    };
  }

  async findOne(id: number): Promise<{ data: TeamEntity }> {
    const data = await this.teamRepository.findOne({ where: { id } });

    if (!data) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
    }

    return {
      data,
    };
  }

  async remove(id: number): Promise<{ data: { message: string } }> {
    const data = await this.teamRepository.findOne({ where: { id } });

    if (!data) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
    }

    await this.teamRepository.remove(data);

    return {
      data: {
        message: 'Team removed successfully',
      },
    };
  }
}
