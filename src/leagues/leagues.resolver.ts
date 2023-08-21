import { ParseIntPipe } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Tournament } from '../tournaments/entities/tournament.entity';
import { LeagueLogo } from '../league-logos/entities/league-logo.entity';
import { LogosByLeagueLoader } from './dataloader/league-logos-by-league.loader';
import { CreateLeagueInput } from './dto/create-league.input';
import { UpdateLeagueInput } from './dto/update-league.input';
import { League } from './entities/league.entity';
import { LeaguesService } from './leagues.service';
import { TournamentsByLeagueLoader } from './dataloader/tournaments-by-league.loader';

@Resolver(() => League)
export class LeaguesResolver {
  constructor(
    private readonly leaguesService: LeaguesService,
    private readonly logosByLeaguesLoader: LogosByLeagueLoader,
    private readonly tournamentsByLeagueLoader: TournamentsByLeagueLoader,
  ) {}

  @ResolveField(() => [LeagueLogo])
  async logos(@Parent() league: League) {
    return await this.logosByLeaguesLoader.load(league.id);
  }

  @ResolveField(() => [Tournament])
  async tournaments(@Parent() league: League) {
    return await this.tournamentsByLeagueLoader.load(league.id);
  }

  @Query(() => [League], { name: 'leagues' })
  async findAll() {
    return this.leaguesService.findAll();
  }

  @Query(() => League, { name: 'league' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.leaguesService.findOne(id);
  }

  @Mutation(() => League, { name: 'createLeague', nullable: true })
  async create(
    @Args('createLeagueInput') createLeagueInput: CreateLeagueInput,
  ) {
    return this.leaguesService.create(createLeagueInput);
  }

  @Mutation(() => League, { name: 'updateLeague' })
  async update(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateLeagueInput') updateLeagueInput: UpdateLeagueInput,
  ) {
    return this.leaguesService.update(id, updateLeagueInput);
  }

  @Mutation(() => League, { name: 'removeLeague' })
  async remove(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.leaguesService.remove(id);
  }
}
