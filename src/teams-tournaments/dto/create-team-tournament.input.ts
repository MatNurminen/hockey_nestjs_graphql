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

@InputType({ description: 'Create team tournament input object type.' })
export class CreateTeamTournamentInput {
  @Field(() => Int, { description: 'A new team tournament tournament_id' })
  @IsNotEmpty()
  @IsInt()
  tournament_id: number;

  @Field(() => Int, { description: 'A new team tournament team_id' })
  @IsNotEmpty()
  @IsInt()
  team_id: number;

  @Field(() => Int, {
    description: 'A new team tournament games',
    defaultValue: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  games: number;

  @Field(() => Int, {
    description: 'A new team tournament wins',
    defaultValue: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  wins: number;

  @Field(() => Int, {
    description: 'A new team tournament ties',
    defaultValue: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  ties: number;

  @Field(() => Int, {
    description: 'A new team tournament losts',
    defaultValue: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  losts: number;

  @Field(() => Int, {
    description: 'A new team tournament goals for',
    defaultValue: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(500)
  goals_for: number;

  @Field(() => Int, {
    description: 'A new team tournament goals against',
    defaultValue: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  goals_against: number;

  @Field(() => String, {
    description: 'A new team tournament postseason',
    defaultValue: '',
  })
  @IsOptional()
  @IsString()
  @MaxLength(250, { message: 'Postseason is too long' })
  postseason: string;
}
