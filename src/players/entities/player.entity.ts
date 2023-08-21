import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Team } from '../../teams/entities/team.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Nation } from '../../nations/entities/nation.entity';
import { PlayerTournament } from '../../players-tournaments/entities/player-tournament.entity';

@Entity('players')
@ObjectType({ description: 'Player model' })
export class Player {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field({ description: 'The first name of a player' })
  first_name: string;

  @Column()
  @Field({ description: 'The last name of a player' })
  last_name: string;

  @Column()
  @Field({ description: 'The jersey number of a player' })
  jersey_number: number;

  @Column()
  @Field({ description: 'The position of a player' })
  player_position: string;

  @Column()
  @Field({ description: 'The order number of a player' })
  player_order: number;

  @Column()
  @Field({ description: 'The nation id of a player' })
  nation_id: number;

  @Column()
  @Field({ description: 'The birth year of a player' })
  birth_year: number;

  @Column()
  @Field({ description: 'The height of a player' })
  height?: number;

  @Column()
  @Field({ description: 'The weight of a player' })
  weight?: number;

  @Column()
  @Field({ description: 'The draft team id of a player' })
  draft_team_id?: number;

  @Column()
  @Field({ description: 'The start year of a player' })
  start_year: number;

  @Column()
  @Field({ description: 'The end year of a player' })
  end_year?: number;

  @OneToMany(
    () => PlayerTournament,
    (playerTournament) => playerTournament.player,
  )
  @Field((type) => [PlayerTournament], {
    description: 'The players of a tournament',
  })
  playersTournaments?: PlayerTournament[];

  @ManyToOne(() => Team, (team) => team.draft_players)
  @JoinColumn({ name: 'draft_team_id' })
  @Field((type) => Team)
  draft_team?: Team;

  @ManyToOne(() => Nation, (nation) => nation.players)
  @JoinColumn({ name: 'nation_id' })
  @Field((type) => Nation)
  nation: Nation;
}
