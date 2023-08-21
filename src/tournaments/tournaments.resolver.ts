import { ParseIntPipe } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TeamTournament } from '../teams-tournaments/entities/team-tournament.entity';
import { TeamsByTournamentLoader } from './dataloader/teams-by-tournament.loader';
import { CreateTournamentInput } from './dto/create-tournament.input';
import { UpdateTournamentInput } from './dto/update-tournament.input';
import { Tournament } from './entities/tournament.entity';
import { TournamentsService } from './tournaments.service';
import { League } from '../leagues/entities/league.entity';
import { Season } from '../seasons/entities/season.entity';
import { LeagueByTournamentLoader } from './dataloader/league-by-tournament.loader';
import { SeasonByTournamentLoader } from './dataloader/season-by-tournament.loader';

@Resolver(() => Tournament)
export class TournamentsResolver {
  constructor(
    private readonly tournamentsService: TournamentsService,
    private readonly teamsByTournamentLoader: TeamsByTournamentLoader,
    private readonly leagueByTournamentLoader: LeagueByTournamentLoader,
    private readonly seasonByTournamentLoader: SeasonByTournamentLoader,
  ) {}

  @ResolveField(() => TeamTournament)
  async teamsTournaments(@Parent() tournament: Tournament) {
    return await this.teamsByTournamentLoader.load(tournament.id);
  }

  @ResolveField(() => League)
  async league(@Parent() tournament: Tournament) {
    return await this.leagueByTournamentLoader.load(tournament.id);
  }

  @ResolveField(() => Season)
  async season(@Parent() tournament: Tournament) {
    return await this.seasonByTournamentLoader.load(tournament.id);
  }

  @Query(() => [Tournament], { name: 'tournaments' })
  async findAll() {
    return this.tournamentsService.findAll();
  }

  @Query(() => Tournament, { name: 'tournament' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.tournamentsService.findOne(id);
  }

  @Mutation(() => Tournament, { name: 'createTournament' })
  async create(
    @Args('createTournamentInput') createTournamentInput: CreateTournamentInput,
  ) {
    return this.tournamentsService.create(createTournamentInput);
  }

  @Mutation(() => Tournament, { name: 'updateTournament' })
  async update(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateTournamentInput') updateTournamentInput: UpdateTournamentInput,
  ) {
    return this.tournamentsService.update(id, updateTournamentInput);
  }

  @Mutation(() => Tournament, { name: 'removeTournament' })
  async remove(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.tournamentsService.remove(id);
  }
}
