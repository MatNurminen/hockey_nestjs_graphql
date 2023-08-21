import { Field, ObjectType } from '@nestjs/graphql';
import { TeamTournament } from '../../../teams-tournaments/entities/team-tournament.entity';

@ObjectType({ description: 'Team By Season model' })
export class TeamBySeason extends TeamTournament {
  @Field({ description: 'Points' })
  pts: number;

  @Field({ description: 'The id of league' })
  league_id: number;

  @Field({ description: 'The id of season' })
  season_id: number;

  @Field({ description: 'The short name of league' })
  short_name: string;
}
