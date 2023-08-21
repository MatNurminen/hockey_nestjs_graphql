import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Tournament by league model' })
export class TournamentByLeague {
  @Field(() => ID, { description: 'The id of tournament' })
  id: number;

  @Field(() => ID, { description: 'The id of season' })
  season_id: number;

  @Field(() => ID, { description: 'The id of league' })
  league_id: number;

  @Field({ description: 'The name of season' })
  season: string;

  @Field({ description: 'The full name of league' })
  league: string;
}
