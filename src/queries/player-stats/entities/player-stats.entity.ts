import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Player stat' })
export class PlayerStat {
  @Field({ description: 'The games total' })
  games_t: number;

  @Field({ description: 'The goals total' })
  goals_t: number;

  @Field({ description: 'The start year' })
  year_start: number;

  @Field({ description: 'The end year' })
  year_end: number;

  @Field({ description: 'The count of years' })
  years: number;
}
