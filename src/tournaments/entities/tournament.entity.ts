import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Season } from '../../seasons/entities/season.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { League } from '../../leagues/entities/league.entity';
import { TeamTournament } from '../../teams-tournaments/entities/team-tournament.entity';

@Entity('tournaments')
@ObjectType({ description: 'Tournament model' })
export class Tournament {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field(() => ID, { description: 'The season_id of a tournament' })
  season_id: number;

  @Column()
  @Field(() => ID, { description: 'The league_id of a tournament' })
  league_id: number;

  @ManyToOne(() => Season, (season) => season.tournaments)
  @JoinColumn({ name: 'season_id' })
  @Field((type) => Season)
  season: Season;

  @ManyToOne(() => League, (league) => league.tournaments)
  @JoinColumn({ name: 'league_id' })
  @Field((type) => League)
  league: League;

  @OneToMany(
    () => TeamTournament,
    (teamTournament) => teamTournament.tournament,
  )
  @Field((type) => [TeamTournament], {
    description: 'The teams tournaments of a tournament',
  })
  teamsTournaments?: TeamTournament[];
}
