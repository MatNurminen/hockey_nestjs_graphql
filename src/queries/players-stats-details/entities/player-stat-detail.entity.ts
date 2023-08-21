import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Player stat and detail model' })
export class PlayerStatDetail {
  @Field({ description: 'The ID of player' })
  player_id: number;

  @Field({ description: 'The games of a player' })
  games: number;

  @Field({ description: 'The goals of a player' })
  goals: number;

  @Field({ description: 'The postseason of a player' })
  postseason?: string;

  @Field({ description: 'The first name of a player' })
  first_name: string;

  @Field({ description: 'The last name of a player' })
  last_name: string;

  @Field({ description: 'The jersey number of a player' })
  jersey_number: number;

  @Field({ description: 'The position of a player' })
  player_position: string;

  @Field({ description: 'The order number of a player' })
  player_order: number;

  @Field({ description: 'The nation id of a player' })
  nation_id: number;

  @Field({ description: 'The birth year of a player' })
  birth_year: number;

  @Field({ description: 'The height of a player' })
  height?: number;

  @Field({ description: 'The weight of a player' })
  weight?: number;

  @Field({ description: 'The draft team id of a player' })
  draft_team_id?: number;

  @Field({ description: 'The start year of a player' })
  start_year: number;

  @Field({ description: 'The end year of a player' })
  end_year?: number;

  @Field({ description: 'The ID of season' })
  season_id: number;

  @Field({ description: 'The ID of league' })
  league_id: number;

  @Field({ description: 'The ID of team' })
  team_id: number;

  @Field({ description: 'The full name of team' })
  full_name: string;

  @Field({ description: 'The short name of league' })
  short_name: string;

  @Field({ description: 'The name of season' })
  name: string;

  @Field({ description: 'The nation flag of player' })
  player_flag: string;

  @Field({ description: 'The nation flag of team' })
  team_flag: string;

  @Field({ description: 'The league local or not' })
  is_local: boolean;
}
