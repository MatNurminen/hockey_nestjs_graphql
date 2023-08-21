import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Player Comparison By Team model' })
export class PlayerComparisonByTeam {
  @Field({ description: 'The team id' })
  team_id: number;

  @Field({ description: 'The country full name' })
  full_name: string;

  @Field({ description: 'The count of players' })
  plrs: number;

  @Field({ description: 'The average height of players' })
  avh: number;

  @Field({ description: 'The average weight of players' })
  avw: number;

  @Field({ description: 'The average age of players' })
  ava: number;
}
