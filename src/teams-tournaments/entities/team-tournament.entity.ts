import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Tournament } from '../../tournaments/entities/tournament.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';
import { PlayerTournament } from '../../players-tournaments/entities/player-tournament.entity';

@Entity('teams_tournaments')
@ObjectType({ description: 'Team tournament model' })
export class TeamTournament {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field({ description: 'The tournament_id of a team tournament' })
  tournament_id: number;

  @Column()
  @Field({ description: 'The team_id of a team tournament' })
  team_id: number;

  @Column()
  @Field({ description: 'The games of a team tournament' })
  games?: number;

  @Column()
  @Field({ description: 'The wins of a team tournament' })
  wins?: number;

  @Column()
  @Field({ description: 'The ties of a team tournament' })
  ties?: number;

  @Column()
  @Field({ description: 'The losts of a team tournament' })
  losts?: number;

  @Column()
  @Field({ description: 'The goals for of a team tournament' })
  goals_for?: number;

  @Column()
  @Field({ description: 'The goals against of a team tournament' })
  goals_against?: number;

  @Column()
  @Field({ description: 'The postseason of a team tournament' })
  postseason?: string;

  @OneToMany(
    () => PlayerTournament,
    (playerTournament) => playerTournament.team_tournament,
  )
  @Field((type) => [PlayerTournament], {
    description: 'The players of a team tournament',
  })
  playersTeamsTournaments?: PlayerTournament[];

  @ManyToOne(() => Tournament, (tournament) => tournament.teamsTournaments)
  @JoinColumn({ name: 'tournament_id' })
  @Field((type) => Tournament)
  tournament: Tournament;

  @ManyToOne(() => Team, (team) => team.teamsTournaments)
  @JoinColumn({ name: 'team_id' })
  @Field((type) => Team)
  team: Team;
}
