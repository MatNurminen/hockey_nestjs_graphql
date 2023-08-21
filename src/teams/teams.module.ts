import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamLogosModule } from '../team-logos/team-logos.module';
import { TeamLogo } from '../team-logos/entities/team-logo.entity';
import { Team } from './entities/team.entity';
import { TeamsService } from './teams.service';
import { TeamsResolver } from './teams.resolver';
import { LogosByTeamLoader } from './dataloader/team-logos-by-team.loader';
import { Nation } from '../nations/entities/nation.entity';
import { TeamsTurnamentsByTeamLoader } from './dataloader/teams-turnaments-by-team.loader';
import { NationsService } from '../nations/nations.service';
import { Player } from '../players/entities/player.entity';
import { DraftsByTeamLoader } from './dataloader/team-drafts-by-team.loader';
import { TeamDbCountByNation } from './entities/team-db-count-by-nation-entity';
import { NationByTeamLoader } from './dataloader/team-nation-by-team.loader';
import { TeamTournament } from '../teams-tournaments/entities/team-tournament.entity';
import { TeamsTournamentsModule } from '../teams-tournaments/teams-tournaments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Team,
      TeamDbCountByNation,
      TeamLogo,
      Nation,
      Player,
      TeamTournament,
    ]),
    TeamLogosModule,
  ],
  providers: [
    TeamsService,
    TeamsResolver,
    LogosByTeamLoader,
    TeamsTurnamentsByTeamLoader,
    DraftsByTeamLoader,
    NationByTeamLoader,
    NationsService,
  ],
  exports: [TeamsService],
})
export class TeamsModule {}
