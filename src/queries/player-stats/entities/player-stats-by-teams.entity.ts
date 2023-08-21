import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PlayerStat } from './player-stats.entity';

@ObjectType({ description: 'The player stat by team' })
export class PlayerStatsByTeam extends PlayerStat {
  @Field(() => ID, { description: 'The team ID' })
  team_id: number;

  @Field({ description: 'The full name of team' })
  full_name: string;

  @Field({ description: 'The nation flag of team' })
  flag: string;
}
