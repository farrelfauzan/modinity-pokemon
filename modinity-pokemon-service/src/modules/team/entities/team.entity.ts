import { AbstractEntity } from '../../../common/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('teams')
export class TeamEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column('simple-array')
  pokemons: string[];
}
