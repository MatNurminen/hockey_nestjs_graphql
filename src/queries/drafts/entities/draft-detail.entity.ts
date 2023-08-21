import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Draft detail model' })
export class DraftDetail {
  @Field(() => ID, { description: 'The id of league' })
  league_id?: number;

  @Field({ description: 'The short name of league' })
  short_name?: string;

  @Field(() => ID, { description: 'The id of player' })
  id: number;

  @Field({ description: 'The position of player' })
  player_position: string;

  @Field({ description: 'The first name of player' })
  first_name: string;

  @Field({ description: 'The last name of player' })
  last_name: string;

  @Field(() => ID, { description: 'The draft team id of player' })
  draft_team_id: number;

  @Field({ description: 'The full name of draft team' })
  full_name: string;

  @Field({ description: 'The nation flag of player' })
  flag: string;

  @Field({ description: 'The total games of player in NHL' })
  games_t?: number;

  @Field({ description: 'The total goals of player in NHL' })
  goals_t?: number;

  @Field({ description: 'The total years of player in NHL' })
  years_t?: number;
}
