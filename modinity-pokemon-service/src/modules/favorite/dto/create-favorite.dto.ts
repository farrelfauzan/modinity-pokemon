import { StringField } from 'src/decorators';

export class CreateFavoriteDto {
  @StringField()
  pokemonName: string;
}
