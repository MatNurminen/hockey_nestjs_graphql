import { Module } from '@nestjs/common';
import { PlayersTournamentsService } from './players-tournaments.service';
import { PlayersTournamentsResolver } from './players-tournaments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerTournament } from './entities/player-tournament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerTournament])],
  providers: [PlayersTournamentsService, PlayersTournamentsResolver],
})
export class PlayersTournamentsModule {}
