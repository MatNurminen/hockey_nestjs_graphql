import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { LeaguesModule } from './leagues/leagues.module';
import { LeagueLogosModule } from './league-logos/league-logos.module';
import { SeasonsModule } from './seasons/seasons.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { TeamLogosModule } from './team-logos/team-logos.module';
import { TeamsModule } from './teams/teams.module';
import { NationsModule } from './nations/nations.module';
import { PlayersModule } from './players/players.module';
import { TeamsTournamentsModule } from './teams-tournaments/teams-tournaments.module';
import { PlayersTournamentsModule } from './players-tournaments/players-tournaments.module';
import { DraftsModule } from './queries/drafts/drafts.module';
import { FreeAgentsModule } from './queries/free-agents/free-agents.module';
import { TeamsStandingsStatsModule } from './queries/teams-standings-stats/teams-standings-stats.module';
import { PlayerStatsModule } from './queries/player-stats/player-stats.module';
import { PlayersStatsDetailsModule } from './queries/players-stats-details/players-stats-details.module';
import { TournamentsStatsModule } from './queries/tournaments-stats/tournaments-stats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      extra: { max: 4 },
      autoLoadEntities: true,
      synchronize: false,
      logging: ['query'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    LeaguesModule,
    LeagueLogosModule,
    SeasonsModule,
    TournamentsModule,
    TeamLogosModule,
    TeamsModule,
    NationsModule,
    PlayersModule,
    TeamsTournamentsModule,
    PlayersTournamentsModule,
    DraftsModule,
    FreeAgentsModule,
    TeamsStandingsStatsModule,
    PlayerStatsModule,
    PlayersStatsDetailsModule,
    TournamentsStatsModule,
  ],
  controllers: [],
})
export class AppModule {}
