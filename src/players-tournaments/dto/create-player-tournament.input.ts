import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

@InputType({ description: 'Create player tournament input object type.' })
export class CreatePlayerTournamentInput {
  @Field(() => Int, {
    description: 'A new player tournament teams_tournament_id',
  })
  @IsNotEmpty()
  @IsInt()
  teams_tournament_id: number;

  @Field(() => Int, {
    description: 'A new player tournament player_id',
  })
  @IsNotEmpty()
  @IsInt()
  player_id: number;

  @Field(() => Int, {
    description: 'A new player tournament games',
    defaultValue: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  games: number;

  @Field(() => Int, {
    description: 'A new player tournament wins',
    defaultValue: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  goals: number;

  @Field(() => String, {
    description: 'A new player tournament postseason',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(250, { message: 'Postseason is too long' })
  postseason: string;
}
