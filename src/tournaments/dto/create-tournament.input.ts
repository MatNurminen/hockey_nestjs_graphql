import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType({ description: 'Create tournament input object type.' })
export class CreateTournamentInput {
  @Field(() => Int, { description: 'A new tournament season_id' })
  @IsNotEmpty()
  @IsInt()
  season_id: number;

  @Field(() => Int, { description: 'A new tournament league_id' })
  @IsNotEmpty()
  @IsInt()
  league_id: number;
}
