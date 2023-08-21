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

@InputType({ description: 'Create team logo input object type.' })
export class CreateTeamLogoInput {
  @Field(() => Int, { description: 'A new team logo start year' })
  @IsNotEmpty()
  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear())
  start_year: number;

  @Field(() => Int, {
    description: 'A new team logo end year',
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear())
  end_year: number;

  @Field(() => String, { description: 'A new team logo link' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(120, { message: 'Link is too long' })
  logo: string;

  @Field(() => Int, { description: 'A new team logo team ID' })
  @IsNotEmpty()
  @IsInt()
  team_id: number;
}
