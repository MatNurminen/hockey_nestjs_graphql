import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTeamTournamentInput } from './create-team-tournament.input';

@InputType()
export class UpdateTeamTournamentInput extends PartialType(
  CreateTeamTournamentInput,
) {}
