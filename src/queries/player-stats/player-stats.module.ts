import { Module } from '@nestjs/common';
import { PlayerStatsService } from './player-stats.service';
import { PlayerStatsResolver } from './player-stats.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerStatsByLeague } from './entities/player-stats-by-leagues.entity';
import { PlayerStatsByTeam } from './entities/player-stats-by-teams.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerStatsByLeague, PlayerStatsByTeam])],
  providers: [PlayerStatsService, PlayerStatsResolver],
})
export class PlayerStatsModule {}
