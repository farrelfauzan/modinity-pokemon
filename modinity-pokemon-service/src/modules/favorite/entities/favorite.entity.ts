import { AbstractEntity } from '../../../common/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'favorites' })
export class FavoriteEntity extends AbstractEntity {
  @Column()
  pokemonName: string;
}
