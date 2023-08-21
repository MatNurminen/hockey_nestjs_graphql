import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Satnding model' })
export class Standing {
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Field(() => ID, { description: 'The tournament_id of a team tournament' })
  tournament_id: number;

  @Field(() => ID, { description: 'The team_id of a team tournament' })
  team_id: number;

  @Field({ description: 'The games of a team tournament' })
  games?: number;

  @Field({ description: 'The wins of a team tournament' })
  wins?: number;

  @Field({ description: 'The ties of a team tournament' })
  ties?: number;

  @Field({ description: 'The losts of a team tournament' })
  losts?: number;

  @Field({ description: 'The goals for of a team tournament' })
  goals_for?: number;

  @Field({ description: 'The goals against of a team tournament' })
  goals_against?: number;

  @Field({ description: 'The postseason of a team tournament' })
  postseason?: string;

  @Field({ description: 'Goal differential' })
  gd: number;

  @Field({ description: 'Points' })
  pts: number;

  @Field({ description: 'The full name of a team tournament' })
  full_name: string;

  @Field(() => ID, { description: 'The season_id of a team tournament' })
  season_id: number;

  @Field({ description: 'The name of a league tournament' })
  name: string;

  @Field({ description: 'The name of a season tournament' })
  season: string;

  @Field({ description: 'The logo of a team tournament' })
  logo: string;
}
