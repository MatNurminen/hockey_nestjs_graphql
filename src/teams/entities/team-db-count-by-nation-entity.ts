import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Teams count by nation model' })
export class TeamDbCountByNation {
  @Field({ description: 'The db count of teams' })
  tms?: number;
}
