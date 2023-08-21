import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerStatsByLeague } from './entities/player-stats-by-leagues.entity';
import { Repository } from 'typeorm';
import { PlayerStatsService } from './player-stats.service';
import { ParseIntPipe } from '@nestjs/common';
import { PlayerStatsByTeam } from './entities/player-stats-by-teams.entity';

@Resolver()
export class PlayerStatsResolver {
  constructor(
    @InjectRepository(PlayerStatsByLeague)
    private playerStatsByLeague: Repository<PlayerStatsByLeague>,
    @InjectRepository(PlayerStatsByTeam)
    private playerStatsByTeam: Repository<PlayerStatsByTeam>,
    private readonly playerStatsService: PlayerStatsService,
  ) {}

  @Query(() => [PlayerStatsByLeague], { name: 'playerStatsByLeagues' })
  async playerStatsByLeagues(
    @Args('playerId', { type: () => ID }, ParseIntPipe) playerId: number,
  ) {
    return this.playerStatsService.playerStatsByLeagues(playerId);
  }

  @Query(() => [PlayerStatsByTeam], { name: 'playerStatsByTeams' })
  async playerStatsByTeams(
    @Args('playerId', { type: () => ID }, ParseIntPipe) playerId: number,
  ) {
    return this.playerStatsService.playerStatsByTeams(playerId);
  }
}
