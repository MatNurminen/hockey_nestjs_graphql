import { Module } from '@nestjs/common';
import { LeagueLogosService } from './league-logos.service';
import { LeagueLogosResolver } from './league-logos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueLogo } from './entities/league-logo.entity';
import { LeaguesService } from '../leagues/leagues.service';
import { League } from '../leagues/entities/league.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeagueLogo, League])],
  providers: [
    LeagueLogosResolver,
    LeagueLogosService,
    LeagueLogo,
    LeaguesService,
  ],
  exports: [LeagueLogosService],
})
export class LeagueLogosModule {}
