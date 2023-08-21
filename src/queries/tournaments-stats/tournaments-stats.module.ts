import { Module } from '@nestjs/common';
import { TournamentsStatsService } from './tournaments-stats.service';
import { TournamentsStatsResolver } from './tournaments-stats.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentByLeague } from './entities/tournaments-by-league';
import { TournamentTeamDet } from './entities/tournament-teams-dets';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentByLeague, TournamentTeamDet])],
  providers: [TournamentsStatsService, TournamentsStatsResolver],
})
export class TournamentsStatsModule {}
