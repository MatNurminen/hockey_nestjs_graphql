import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { TeamLogosService } from './team-logos.service';
import { TeamLogo } from './entities/team-logo.entity';
import { CreateTeamLogoInput } from './dto/create-team-logo.input';
import { UpdateTeamLogoInput } from './dto/update-team-logo.input';

@Resolver(() => TeamLogo)
export class TeamLogosResolver {
  constructor(private readonly teamLogosService: TeamLogosService) {}

  @Query(() => [TeamLogo], { name: 'teamLogos' })
  async findAll() {
    return this.teamLogosService.findAll();
  }

  @Query(() => TeamLogo, { name: 'teamLogo' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.teamLogosService.findOne(id);
  }

  @Mutation(() => TeamLogo, { name: 'createTeamLogo' })
  async create(
    @Args('createTeamLogoInput') createTeamLogoInput: CreateTeamLogoInput,
  ) {
    return this.teamLogosService.create(createTeamLogoInput);
  }

  @Mutation(() => TeamLogo, { name: 'updateTeamLogo' })
  async update(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateTeamLogoInput') updateTeamLogoInput: UpdateTeamLogoInput,
  ) {
    return this.teamLogosService.update(id, updateTeamLogoInput);
  }

  @Mutation(() => TeamLogo)
  removeTeamLogo(@Args('id', { type: () => Int }, ParseIntPipe) id: number) {
    return this.teamLogosService.remove(id);
  }
}
