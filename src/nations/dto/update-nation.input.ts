import { InputType, PartialType } from '@nestjs/graphql';
import { CreateNationInput } from './create-nation.input';

@InputType()
export class UpdateNationInput extends PartialType(CreateNationInput) {}
