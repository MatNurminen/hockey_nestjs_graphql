import { CreateLeagueLogoInput } from './create-league-logo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLeagueLogoInput extends PartialType(CreateLeagueLogoInput) {}
