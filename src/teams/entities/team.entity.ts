import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TeamLogo } from '../../team-logos/entities/team-logo.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Nation } from '../../nations/entities/nation.entity';
import { Player } from '../../players/entities/player.entity';
import { TeamTournament } from '../../teams-tournaments/entities/team-tournament.entity';

@Entity('teams')
@ObjectType({ description: 'Team model' })
export class Team {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field({ description: 'The full name of a team' })
  full_name: string;

  @Column()
  @Field({ description: 'The name of a team' })
  name: string;

  @Column()
  @Field({ description: 'The short name of a team' })
  short_name: string;

  @Column()
  @Field({ description: 'The start year of a team' })
  start_year: number;

  @Column()
  @Field({ description: 'The end year of a team', nullable: true })
  end_year?: number;

  @Column()
  @Field({ description: 'The nation_id of a team' })
  nation_id: number;

  @OneToMany(() => TeamLogo, (teamLogo) => teamLogo.team)
  @Field((type) => [TeamLogo], { description: 'The logos of a team' })
  logos: TeamLogo[];

  @OneToMany(() => Player, (player) => player.draft_team)
  @Field((type) => [Player], { description: 'The drafted players of a team' })
  draft_players?: Player[];

  @OneToMany(
    () => TeamTournament,
    (teamTournament) => teamTournament.tournament,
  )
  @Field((type) => [TeamTournament], {
    description: 'The teams tournaments of a tournament',
  })
  teamsTournaments?: TeamTournament[];

  @ManyToOne(() => Nation, (nation) => nation.teams)
  @JoinColumn({ name: 'nation_id' })
  @Field((type) => Nation)
  nation: Nation;
}
