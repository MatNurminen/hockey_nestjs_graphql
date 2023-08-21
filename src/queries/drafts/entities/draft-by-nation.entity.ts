import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Draft by nation model' })
export class DraftByNation {
  @Field(() => ID, { description: 'The id of nation' })
  id: number;

  @Field({ description: 'The name of nation' })
  name: string;

  @Field({ description: 'The flag of nation' })
  flag: string;

  @Field({ description: 'The count of players by nation' })
  plrs: number;
}
