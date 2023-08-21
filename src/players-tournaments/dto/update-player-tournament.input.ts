import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePlayerTournamentInput } from './create-player-tournament.input';

@InputType()
export class UpdatePlayerTournamentInput extends PartialType(
  CreatePlayerTournamentInput,
) {}
