import { ObjectType, Field, ID } from '@nestjs/graphql';
import { League } from '../../leagues/entities/league.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('league_logos')
@ObjectType()
export class LeagueLogo {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field({ description: 'The start year of a league logo' })
  start_year: number;

  @Column()
  @Field({ description: 'The end year of a league logo', nullable: true })
  end_year?: number;

  @Column()
  @Field({ description: 'The link of a league logo' })
  logo: string;

  @Column()
  @Field({ description: 'The league ID of a league logo' })
  league_id: number;

  @ManyToOne(() => League, (league) => league.logos)
  @JoinColumn({ name: 'league_id' })
  @Field((type) => League)
  league?: League;
}
