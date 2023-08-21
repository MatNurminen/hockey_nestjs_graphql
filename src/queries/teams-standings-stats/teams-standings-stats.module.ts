import { Module } from '@nestjs/common';
import { TeamsStandingsStatsService } from './teams-standings-stats.service';
import { TeamsStandingsStatsResolver } from './teams-standings-stats.resolver';
import { Standing } from './entities/standing.entity';
import { TeamBySeason } from './entities/team-by-season.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamByLeague } from './entities/team-by-league.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Standing, TeamBySeason, TeamByLeague])],
  providers: [TeamsStandingsStatsService, TeamsStandingsStatsResolver],
})
export class TeamsStandingsStatsModule {}
