import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamTournament } from '../../teams-tournaments/entities/team-tournament.entity';
import { Player } from '../../players/entities/player.entity';

@Entity('players_tournaments')
@ObjectType({ description: 'Player tournament model' })
export class PlayerTournament {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field({ description: 'The teams_tournament_id of a player tournament' })
  teams_tournament_id: number;

  @Column()
  @Field({ description: 'The player_id of a player tournament' })
  player_id: number;

  @Column()
  @Field({ description: 'The games of a player tournament' })
  games?: number;

  @Column()
  @Field({ description: 'The goals of a player tournament' })
  goals?: number;

  @Column()
  @Field({ description: 'The postseason of a player tournament' })
  postseason?: string;

  @ManyToOne(
    () => TeamTournament,
    (team_tournament) => team_tournament.playersTeamsTournaments,
  )
  @JoinColumn({ name: 'teams_tournament_id' })
  @Field((type) => TeamTournament)
  team_tournament?: TeamTournament;

  @ManyToOne(() => Player, (player) => player.playersTournaments)
  @JoinColumn({ name: 'player_id' })
  @Field((type) => Player)
  player: Player;
}
