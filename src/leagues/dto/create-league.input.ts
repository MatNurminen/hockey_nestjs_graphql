import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsHexColor,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

@InputType({ description: 'Create league input object type.' })
export class CreateLeagueInput {
  @Field(() => String, { description: 'A new league name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Name is too long' })
  name: string;

  @Field(() => String, { description: 'A new league short name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10, { message: 'Short name is too long' })
  short_name: string;

  @Field(() => Int, { description: 'A new league start year' })
  @IsNotEmpty()
  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear())
  start_year: number;

  @Field(() => Int, { description: 'A new league end year', nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear())
  end_year: number;

  @Field(() => String, { description: 'A new league color', nullable: true })
  @IsOptional()
  @IsHexColor()
  color: string;

  @Field(() => Boolean, {
    description: 'Is the league local?',
    defaultValue: false,
  })
  @IsOptional()
  @IsBoolean()
  is_local: boolean;
}
