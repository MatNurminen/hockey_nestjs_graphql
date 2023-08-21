import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Players count by nation model' })
export class PlayerDbCountByNation {
  @Field({ description: 'The db count of a players' })
  plrs?: number;
}
