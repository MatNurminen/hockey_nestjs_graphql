import { Field, ID, ObjectType } from '@nestjs/graphql';
import { LeagueLogo } from '../../league-logos/entities/league-logo.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tournament } from '../../tournaments/entities/tournament.entity';

@Entity('leagues')
@ObjectType({ description: 'League model' })
export class League {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field({ description: 'The name of a league' })
  name: string;

  @Column()
  @Field({ description: 'The short name of a league' })
  short_name: string;

  @Column()
  @Field({ description: 'The start year of a league' })
  start_year: number;

  @Column()
  @Field({ description: 'The end year of a league', nullable: true })
  end_year?: number;

  @Column()
  @Field({ description: 'The color of a league', nullable: true })
  color?: string;

  @Column()
  @Field({ description: 'Is the league local' })
  is_local: boolean;

  @OneToMany(() => LeagueLogo, (leagueLogo) => leagueLogo.league)
  @Field((type) => [LeagueLogo], { description: 'The logos of a league' })
  logos?: LeagueLogo[];

  @OneToMany(() => Tournament, (tournament) => tournament.league)
  @Field((type) => [Tournament], { description: 'The tournaments of a league' })
  tournaments?: Tournament[];
}
