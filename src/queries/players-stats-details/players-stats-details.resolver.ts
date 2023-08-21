import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Int, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerStatDetail } from './entities/player-stat-detail.entity';
import { Repository } from 'typeorm';
import { PlayersStatsDetailsService } from './players-stats-details.service';
import { PlayerStatTotal } from './entities/player-stat-total.entity';
import { PlayerCountByNation } from './entities/player-count-by-nation.entity';
import { PlayerComparisonByTeam } from './entities/player-comparison-by-team.entity';
import { Roster } from './entities/roster.entity';

@Resolver()
export class PlayersStatsDetailsResolver {
  constructor(
    @InjectRepository(PlayerStatDetail)
    private playerStatDetail: Repository<PlayerStatDetail>,
    @InjectRepository(PlayerStatTotal)
    private playerStatTotal: Repository<PlayerStatTotal>,
    @InjectRepository(PlayerCountByNation)
    private playerCountByNation: Repository<PlayerCountByNation>,
    @InjectRepository(PlayerComparisonByTeam)
    private playerComparisonByTeam: Repository<PlayerComparisonByTeam>,
    @InjectRepository(Roster)
    private roster: Repository<Roster>,
    private readonly playersStatsDetailsService: PlayersStatsDetailsService,
  ) {}

  @Query(() => [PlayerStatDetail], { name: 'playersStatsDetails' })
  async playersStatsDetails(
    @Args('leagueId', { type: () => ID, nullable: true }) leagueId: number,
    @Args('teamId', { type: () => ID, nullable: true }) teamId: number,
    @Args('seasonId', { type: () => ID, nullable: true }) seasonId: number,
    @Args('nationId', { type: () => ID, nullable: true }) nationId: number,
    @Args('playerId', { type: () => ID, nullable: true }) playerId: number,
  ) {
    return this.playersStatsDetailsService.playersStatsDetails(
      leagueId,
      teamId,
      seasonId,
      nationId,
      playerId,
    );
  }

  @Query(() => [PlayerStatTotal], { name: 'playersStatsTotal' })
  async playersStatsTotal(
    @Args('leagueId', { type: () => ID, nullable: true }) leagueId: number,
    @Args('teamId', { type: () => ID, nullable: true }) teamId: number,
    @Args('nationId', { type: () => ID, nullable: true }) nationId: number,
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
  ) {
    return this.playersStatsDetailsService.playersStatsTotal(
      leagueId,
      teamId,
      nationId,
      limit,
    );
  }

  @Query(() => [PlayerCountByNation], { name: 'playersCountByNation' })
  async countPlayersByNation(
    @Args('leagueId', { type: () => ID, nullable: true }) leagueId: number,
    @Args('seasonId', { type: () => ID, nullable: true }) seasonId: number,
    @Args('teamId', { type: () => ID, nullable: true }) teamId: number,
  ) {
    return this.playersStatsDetailsService.countPlayersByNation(
      leagueId,
      seasonId,
      teamId,
    );
  }

  @Query(() => [PlayerComparisonByTeam], { name: 'playersComparisonByTeams' })
  async playersComparisonByTeams(
    @Args('leagueId', { type: () => ID }, ParseIntPipe) leagueId: number,
    @Args('seasonId', { type: () => ID }, ParseIntPipe) seasonId: number,
  ) {
    return this.playersStatsDetailsService.playersComparisonByTeams(
      leagueId,
      seasonId,
    );
  }

  @Query(() => [Roster], { name: 'rosters' })
  async rosters(
    @Args('leagueId', { type: () => ID }, ParseIntPipe) leagueId: number,
    @Args('seasonId', { type: () => ID }, ParseIntPipe) seasonId: number,
  ) {
    return this.playersStatsDetailsService.roster(leagueId, seasonId);
  }
}
