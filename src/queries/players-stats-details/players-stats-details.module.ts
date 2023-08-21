import { Module } from '@nestjs/common';
import { PlayersStatsDetailsService } from './players-stats-details.service';
import { PlayersStatsDetailsResolver } from './players-stats-details.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerStatDetail } from './entities/player-stat-detail.entity';
import { PlayerStatTotal } from './entities/player-stat-total.entity';
import { PlayerCountByNation } from './entities/player-count-by-nation.entity';
import { PlayerComparisonByTeam } from './entities/player-comparison-by-team.entity';
import { Roster } from './entities/roster.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlayerStatDetail,
      PlayerStatTotal,
      PlayerCountByNation,
      PlayerComparisonByTeam,
      Roster,
    ]),
  ],
  providers: [PlayersStatsDetailsService, PlayersStatsDetailsResolver],
})
export class PlayersStatsDetailsModule {}
