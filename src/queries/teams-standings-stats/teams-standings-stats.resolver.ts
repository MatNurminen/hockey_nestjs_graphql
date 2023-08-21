import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Standing } from './entities/standing.entity';
import { TeamBySeason } from './entities/team-by-season.entity';
import { Repository } from 'typeorm';
import { TeamsStandingsStatsService } from './teams-standings-stats.service';
import { ParseIntPipe } from '@nestjs/common';
import { TeamByLeague } from './entities/team-by-league.entity';

@Resolver()
export class TeamsStandingsStatsResolver {
  constructor(
    @InjectRepository(Standing)
    private readonly standingRepository: Repository<Standing>,
    @InjectRepository(TeamBySeason)
    private readonly teamBySeasonRepository: Repository<TeamBySeason>,
    @InjectRepository(TeamByLeague)
    private readonly teamByLeagueRepository: Repository<TeamByLeague>,
    private readonly stangingsService: TeamsStandingsStatsService,
  ) {}

  @Query(() => [Standing], { name: 'standings' })
  async standings(
    @Args('leagueId', { type: () => ID }, ParseIntPipe) leagueId: number,
    @Args('seasonId', { type: () => ID }, ParseIntPipe) seasonId: number,
  ) {
    return this.stangingsService.standings(leagueId, seasonId);
  }

  @Query(() => [TeamBySeason], { name: 'teamsBySeasons' })
  async teamsBySeasons(
    @Args('teamId', { type: () => ID }, ParseIntPipe) teamId: number,
    @Args('local') local: boolean,
  ) {
    return this.stangingsService.teamsBySeasons(teamId, local);
  }

  @Query(() => [TeamByLeague], { name: 'teamsByLeague' })
  async teamsByLeague(
    @Args('leagueId', { type: () => ID }, ParseIntPipe) leagueId: number,
  ) {
    return this.stangingsService.teamsByLeague(leagueId);
  }
}
