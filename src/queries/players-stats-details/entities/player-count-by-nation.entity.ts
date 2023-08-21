import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Count players by nation model' })
export class PlayerCountByNation {
  @Field({ description: 'The country id' })
  id: number;

  @Field({ description: 'The country name' })
  name: string;

  @Field({ description: 'The country flag' })
  flag: string;

  @Field({ description: 'The country color' })
  color: string;

  @Field({ description: 'The count of players' })
  count: number;
}
