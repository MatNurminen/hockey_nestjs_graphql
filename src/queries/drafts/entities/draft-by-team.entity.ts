import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Draft by team model' })
export class DraftByTeam {
  @Field(() => ID, { description: 'The id of team' })
  id: number;

  @Field({ description: 'The full name of team' })
  full_name: string;

  @Field({ description: 'The logo of team' })
  logo: string;

  @Field({ description: 'The count of players by team' })
  plrs: number;
}
