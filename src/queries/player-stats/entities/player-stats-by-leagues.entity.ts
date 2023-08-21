import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PlayerStat } from './player-stats.entity';

@ObjectType({ description: 'The player stat by league' })
export class PlayerStatsByLeague extends PlayerStat {
  @Field(() => ID, { description: 'The league ID' })
  league_id: number;

  @Field({ description: 'The short name of league' })
  short_name: string;
}
