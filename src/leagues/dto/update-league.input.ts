import { InputType, PartialType } from '@nestjs/graphql';
import { CreateLeagueInput } from './create-league.input';

@InputType()
export class UpdateLeagueInput extends PartialType(CreateLeagueInput) {}
