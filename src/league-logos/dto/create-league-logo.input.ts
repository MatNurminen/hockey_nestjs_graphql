import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

@InputType({ description: 'Create league logo input object type.' })
export class CreateLeagueLogoInput {
  @Field(() => Int, { description: 'A new league logo start year' })
  @IsNotEmpty()
  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear())
  start_year: number;

  @Field(() => Int, {
    description: 'A new league logo end year',
    nullable: true,
    defaultValue: null,
  })
  @IsOptional()
  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear())
  end_year: number;

  @Field(() => String, { description: 'A new league logo link' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(120, { message: 'Link is too long' })
  logo: string;

  @Field(() => Int, { description: 'A new league logo league ID' })
  @IsNotEmpty()
  @IsInt()
  league_id: number;
}
