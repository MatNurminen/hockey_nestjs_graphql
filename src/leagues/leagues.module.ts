import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueLogosModule } from '../league-logos/league-logos.module';
import { League } from './entities/league.entity';
import { LeaguesResolver } from './leagues.resolver';
import { LeaguesService } from './leagues.service';
import { LogosByLeagueLoader } from './dataloader/league-logos-by-league.loader';
import { LeagueLogo } from '../league-logos/entities/league-logo.entity';
import { Tournament } from '../tournaments/entities/tournament.entity';
import { TournamentsByLeagueLoader } from './dataloader/tournaments-by-league.loader';

@Module({
  imports: [
    TypeOrmModule.forFeature([League, LeagueLogo, Tournament]),
    LeagueLogosModule,
  ],
  providers: [
    LeaguesResolver,
    LeaguesService,
    LogosByLeagueLoader,
    TournamentsByLeagueLoader,
  ],
  exports: [LeaguesService],
})
export class LeaguesModule {}
