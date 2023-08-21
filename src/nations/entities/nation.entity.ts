import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Team } from '../../teams/entities/team.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from '../../players/entities/player.entity';

@Entity('nations')
@ObjectType({ description: 'Nation model' })
export class Nation {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field({ description: 'The name of a nation' })
  name: string;

  @Column()
  @Field({ description: 'The short name of a nation' })
  short_name: string;

  @Column()
  @Field({ description: 'The flag of a nation' })
  flag: string;

  @Column()
  @Field({ description: 'The logo of a nation' })
  logo: string;

  @Column()
  @Field({ description: 'The color of a nation', nullable: true })
  color: string;

  @OneToMany(() => Team, (team) => team.nation)
  @Field((type) => [Team], { description: 'The teams of a nation' })
  teams?: Team[];

  @OneToMany(() => Player, (player) => player.nation)
  @Field((type) => [Player], { description: 'The players of a nation' })
  players?: Player[];
}
