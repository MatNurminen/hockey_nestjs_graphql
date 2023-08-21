import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Roster of players' })
export class Roster {
  @Field(() => ID, { description: 'The ID of players_tournaments' })
  id: number;

  @Field(() => ID, { description: 'The ID of teams_tournament' })
  teams_tournament_id: number;

  @Field(() => ID, { description: 'The ID of players_tournament' })
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

  @Field(() => ID, { description: 'The nation id of a player' })
  nation_id: number;

  @Field({ description: 'The birth year of a player' })
  birth_year: number;

  @Field({ description: 'The height of a player' })
  height?: number;

  @Field({ description: 'The weight of a player' })
  weight?: number;

  @Field(() => ID, { description: 'The draft team id of a player' })
  draft_team_id?: number;

  @Field({ description: 'The start year of a player' })
  start_year: number;

  @Field({ description: 'The end year of a player' })
  end_year?: number;

  @Field(() => ID, { description: 'The ID of season' })
  season_id: number;

  @Field(() => ID, { description: 'The ID of league' })
  league_id: number;

  @Field({ description: 'The full name of team' })
  full_name: string;

  @Field({ description: 'The short name of league' })
  short_name: string;

  @Field({ description: 'The name of season' })
  name: string;

  @Field({ description: 'The nation flag of player' })
  flag: string;

  @Field({ description: 'The logo of league' })
  league_logo: string;

  @Field({ description: 'The logo of team' })
  logo: string;

  @Field({ description: 'The logo of draft team' })
  draft_logo?: string;
}
