import { Module } from '@nestjs/common';
import { NationsService } from './nations.service';
import { NationsResolver } from './nations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nation } from './entities/nation.entity';
import { TeamsByNationLoader } from './dataloader/teams-by-nation.loader';
import { PlayersByNationLoader } from './dataloader/players-by-nation.loader';

@Module({
  imports: [TypeOrmModule.forFeature([Nation])],
  providers: [
    NationsService,
    NationsResolver,
    TeamsByNationLoader,
    PlayersByNationLoader,
  ],
})
export class NationsModule {}
