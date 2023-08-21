import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Team By League model' })
export class TeamByLeague {
  @Field(() => ID, { description: 'The id of team' })
  id: number;

  @Field(() => ID, { description: 'The id of nation' })
  nation_id: number;

  @Field({ description: 'The full name of team' })
  full_name: string;

  @Field({ description: 'The country flag of team' })
  flag: string;
}
