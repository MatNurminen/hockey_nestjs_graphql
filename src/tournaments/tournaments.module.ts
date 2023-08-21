import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { TournamentsService } from './tournaments.service';
import { TournamentsResolver } from './tournaments.resolver';
import { TeamsByTournamentLoader } from './dataloader/teams-by-tournament.loader';
import { League } from '../leagues/entities/league.entity';
import { LeagueByTournamentLoader } from './dataloader/league-by-tournament.loader';
import { SeasonByTournamentLoader } from './dataloader/season-by-tournament.loader';
import { Season } from '../seasons/entities/season.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, League, Season])],
  providers: [
    TournamentsService,
    TournamentsResolver,
    TeamsByTournamentLoader,
    LeagueByTournamentLoader,
    SeasonByTournamentLoader,
  ],
})
export class TournamentsModule {}
