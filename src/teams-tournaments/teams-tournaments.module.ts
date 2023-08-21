import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamTournament } from './entities/team-tournament.entity';
import { TeamsTournamentsService } from './teams-tournaments.service';
import { TeamsTournamentsResolver } from './teams-tournaments.resolver';
import { Team } from '../teams/entities/team.entity';
import { TeamsService } from '../teams/teams.service';
import { TeamDbCountByNation } from '../teams/entities/team-db-count-by-nation-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamTournament, Team, TeamDbCountByNation]),
  ],
  providers: [TeamsTournamentsService, TeamsTournamentsResolver, TeamsService],
})
export class TeamsTournamentsModule {}
