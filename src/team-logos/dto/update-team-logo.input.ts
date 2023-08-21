import { CreateTeamLogoInput } from './create-team-logo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTeamLogoInput extends PartialType(CreateTeamLogoInput) {}
