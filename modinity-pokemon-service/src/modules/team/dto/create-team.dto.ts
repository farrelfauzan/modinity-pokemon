import { StringField } from 'src/decorators';

export class CreateTeamDto {
  @StringField()
  name: string;

  @StringField({ each: true })
  pokemons: string[];
}
