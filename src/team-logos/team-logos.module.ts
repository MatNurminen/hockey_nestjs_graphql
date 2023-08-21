import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamLogo } from './entities/team-logo.entity';
import { TeamLogosService } from './team-logos.service';
import { TeamLogosResolver } from './team-logos.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TeamLogo])],
  providers: [TeamLogosService, TeamLogosResolver],
})
export class TeamLogosModule {}
