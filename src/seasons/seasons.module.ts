import { Module } from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { SeasonsResolver } from './seasons.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from './entities/season.entity';
import { Tournament } from '../tournaments/entities/tournament.entity';
import { TournamentsBySeasonLoader } from './dataloader/tournaments-by-season.loader';

@Module({
  imports: [TypeOrmModule.forFeature([Season, Tournament]), SeasonsModule],
  providers: [SeasonsService, SeasonsResolver, TournamentsBySeasonLoader],
})
export class SeasonsModule {}
