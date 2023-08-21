import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Team } from '../../teams/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('team_logos')
@ObjectType()
export class TeamLogo {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field({ description: 'The start year of a team logo' })
  start_year: number;

  @Column()
  @Field({ description: 'The end year of a team logo', nullable: true })
  end_year?: number;

  @Column()
  @Field({ description: 'The link of a team logo' })
  logo: string;

  @Column()
  @Field({ description: 'The team ID of a team logo' })
  team_id: number;

  @ManyToOne(() => Team, (team) => team.logos)
  @JoinColumn({ name: 'team_id' })
  @Field((type) => Team)
  team: Team;
}
