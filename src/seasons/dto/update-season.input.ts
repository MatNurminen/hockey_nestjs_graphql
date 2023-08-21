import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSeasonInput } from './create-season.input';

@InputType()
export class UpdateSeasonInput extends PartialType(CreateSeasonInput) {}
