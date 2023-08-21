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

@InputType({ description: 'Create player input object type.' })
export class CreatePlayerInput {
  @Field(() => String, { description: 'A new player first name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'First name is too long' })
  first_name: string;

  @Field(() => String, { description: 'A new player last name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'Last name is too long' })
  last_name: string;

  @Field(() => Int, { description: 'A new player jersey number' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(99)
  jersey_number: number;

  @Field(() => String, { description: 'A new player position' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(5, { message: 'Position is too long' })
  player_position: string;

  @Field(() => Int, { description: 'A new player order number' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(3)
  player_order: number;

  @Field(() => Int, { description: 'A new player nation_id' })
  @IsNotEmpty()
  @IsInt()
  nation_id: number;

  @Field(() => Int, { description: 'A new player birth year' })
  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() - 15)
  birth_year: number;

  @Field(() => Int, { description: 'A new player height', nullable: true })
  @IsOptional()
  @IsInt()
  @Min(140)
  @Max(240)
  height: number;

  @Field(() => Int, { description: 'A new player weight', nullable: true })
  @IsOptional()
  @IsInt()
  @Min(40)
  @Max(200)
  weight: number;

  @Field(() => Int, { description: 'A new player weight', nullable: true })
  @IsOptional()
  @IsInt()
  draft_team_id: number;

  @Field(() => Int, { description: 'A new player start year' })
  @IsNotEmpty()
  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear())
  start_year: number;

  @Field(() => Int, { description: 'A new player end year', nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1980)
  @Max(new Date().getFullYear())
  end_year: number;
}
