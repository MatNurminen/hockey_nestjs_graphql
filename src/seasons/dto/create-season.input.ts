import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

@InputType({ description: 'Create season input object type.' })
export class CreateSeasonInput {
  @Field(() => Int, { description: 'A new season id' })
  @IsNotEmpty()
  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear() + 1)
  id: number;

  @Field(() => String, { description: 'A new season name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20, { message: 'Name is too long' })
  name: string;

  @Field(() => String, { description: 'A new season logo' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, { message: 'Logo is too long' })
  logo: string;

  @Field(() => String, { description: 'A new season link' })
  @IsNotEmpty()
  @IsUrl()
  @MaxLength(100, { message: 'Link is too long' })
  link: string;
}
