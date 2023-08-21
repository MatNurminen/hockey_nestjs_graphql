import { Field, InputType } from '@nestjs/graphql';
import {
  IsHexColor,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType({ description: 'Create nation input object type.' })
export class CreateNationInput {
  @Field(() => String, { description: 'A new nation name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Name is too long' })
  name: string;

  @Field(() => String, { description: 'A new nation short name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(5, { message: 'Short name is too long' })
  short_name: string;

  @Field(() => String, { description: 'A new nation flag' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(120, { message: 'Flag is too long' })
  flag: string;

  @Field(() => String, { description: 'A new nation logo' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(120, { message: 'Logo is too long' })
  logo: string;

  @Field(() => String, { description: 'A new nation color', nullable: true })
  @IsOptional()
  @IsHexColor()
  color: string;
}
