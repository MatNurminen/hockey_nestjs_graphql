import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTournamentInput } from './create-tournament.input';

@InputType()
export class UpdateTournamentInput extends PartialType(CreateTournamentInput) {}
