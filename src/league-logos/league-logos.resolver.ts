import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LeagueLogosService } from './league-logos.service';
import { LeagueLogo } from './entities/league-logo.entity';
import { CreateLeagueLogoInput } from './dto/create-league-logo.input';
import { UpdateLeagueLogoInput } from './dto/update-league-logo.input';
import { ParseIntPipe } from '@nestjs/common';
import { League } from '../leagues/entities/league.entity';
import { LeaguesService } from '../leagues/leagues.service';

@Resolver(() => LeagueLogo)
export class LeagueLogosResolver {
  constructor(
    private readonly leagueLogosService: LeagueLogosService,
    private readonly leagueService: LeaguesService,
  ) {}

  // @ResolveField((id) => League)
  // async league(@Parent() leagueLogo: LeagueLogo) {
  //   return await this.leagueService.findOne(leagueLogo.league_id);
  // }

  @Query(() => [LeagueLogo], { name: 'leagueLogos' })
  async findAll() {
    return this.leagueLogosService.findAll();
  }

  @Query(() => LeagueLogo, { name: 'leagueLogo' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.leagueLogosService.findOne(id);
  }

  @Mutation(() => LeagueLogo, { name: 'createLeagueLogo' })
  async create(
    @Args('createLeagueLogoInput') createLeagueLogoInput: CreateLeagueLogoInput,
  ) {
    return this.leagueLogosService.create(createLeagueLogoInput);
  }

  @Mutation(() => LeagueLogo, { name: 'updateLeagueLogo' })
  async update(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateLeagueLogoInput') updateLeagueLogoInput: UpdateLeagueLogoInput,
  ) {
    return this.leagueLogosService.update(id, updateLeagueLogoInput);
  }

  @Mutation(() => LeagueLogo)
  removeLeagueLogo(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.leagueLogosService.remove(id);
  }
}
