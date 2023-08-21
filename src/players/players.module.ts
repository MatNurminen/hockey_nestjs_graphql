import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { PlayersService } from './players.service';
import { PlayersResolver } from './players.resolver';
import { PlayerTournament } from '../players-tournaments/entities/player-tournament.entity';
import { TournamentsByPlayerLoader } from './dataloader/players-tournaments-by-player.loader';
import { Nation } from '../nations/entities/nation.entity';
import { NationsService } from '../nations/nations.service';
import { Team } from '../teams/entities/team.entity';
import { TeamDbCountByNation } from '../teams/entities/team-db-count-by-nation-entity';
import { TeamsService } from '../teams/teams.service';
import { PlayerDbCountByNation } from './entities/player-db-count-by-nation.entity';
import { NationByPlayerLoader } from './dataloader/player-nation-by-team.loader';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Player,
      PlayerTournament,
      Nation,
      Team,
      PlayerDbCountByNation,
      TeamDbCountByNation,
    ]),
  ],
  providers: [
    PlayersService,
    PlayersResolver,
    TournamentsByPlayerLoader,
    NationByPlayerLoader,
    NationsService,
    TeamsService,
  ],
})
export class PlayersModule {}
