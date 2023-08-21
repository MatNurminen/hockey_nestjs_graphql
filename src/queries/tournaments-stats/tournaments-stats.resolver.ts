import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentByLeague } from './entities/tournaments-by-league';
import { Repository } from 'typeorm';
import { TournamentsStatsService } from './tournaments-stats.service';
import { ParseIntPipe } from '@nestjs/common';
import { TournamentTeamDet } from './entities/tournament-teams-dets';

@Resolver()
export class TournamentsStatsResolver {
  constructor(
    @InjectRepository(TournamentByLeague)
    private readonly tournamentByLeagueRepository: Repository<TournamentByLeague>,
    @InjectRepository(TournamentTeamDet)
    private readonly tournamentTeamDetRepository: Repository<TournamentTeamDet>,
    private readonly tournamentsStatsService: TournamentsStatsService,
  ) {}

  @Query(() => [TournamentByLeague], { name: 'tournamentsByLeague' })
  async tournamentsByLeague(
    @Args('leagueId', { type: () => ID }, ParseIntPipe) leagueId: number,
  ) {
    return this.tournamentsStatsService.tournamentsByLeague(leagueId);
  }

  @Query(() => [TournamentTeamDet], { name: 'tournamentTeamsDets' })
  async tournamentTeamsDets(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ) {
    return this.tournamentsStatsService.tournamentTeamsDets(id);
  }
}
