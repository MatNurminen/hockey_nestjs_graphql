import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Tournament teams details' })
export class TournamentTeamDet {
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Field(() => ID, { description: 'The season_id of a tournament' })
  season_id: number;

  @Field({ description: 'The league name of a tournament' })
  league_name: string;

  @Field({ description: 'The season name of a tournament' })
  season_name: string;

  @Field(() => ID, { description: 'The team_id of a tournament' })
  team_id: number;

  @Field({ description: 'The full name of a tournament team' })
  full_name: string;

  @Field({ description: 'The nation flag of a tournament team' })
  flag: string;

  @Field(() => ID, { description: 'The league_id of a tournament' })
  league_id: number;
}
