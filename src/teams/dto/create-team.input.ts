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

@InputType({ description: 'Create team input object type.' })
export class CreateTeamInput {
  @Field(() => String, { description: 'A new team full name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(120, { message: 'Full name is too long' })
  full_name: string;

  @Field(() => String, { description: 'A new team name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Name is too long' })
  name: string;

  @Field(() => String, { description: 'A new team short name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(5, { message: 'Short name is too long' })
  short_name: string;

  @Field(() => Int, { description: 'A new team start year' })
  @IsNotEmpty()
  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear())
  start_year: number;

  @Field(() => Int, { description: 'A new team end year', nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear())
  end_year: number;
}
