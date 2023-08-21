import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Player stat total model' })
export class PlayerStatTotal {
  @Field({ description: 'The ID of player' })
  player_id: number;

  @Field({ description: 'The first name of a player' })
  first_name: string;

  @Field({ description: 'The last name of a player' })
  last_name: string;

  @Field({ description: 'The position of a player' })
  player_position: string;

  @Field({ description: 'The order number of a player' })
  player_order: number;

  @Field({ description: 'The nation flag of player' })
  player_flag: string;

  @Field({ description: 'The start year of a player' })
  start_year: number;

  @Field({ description: 'The end year of a player' })
  end_year?: number;

  @Field({ description: 'The total of games' })
  games_t: number;

  @Field({ description: 'The total of goals' })
  goals_t: number;

  @Field({ description: 'The total of years' })
  years: number;
}
