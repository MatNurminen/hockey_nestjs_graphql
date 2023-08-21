import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerStatsByLeague } from './entities/player-stats-by-leagues.entity';
import { Repository } from 'typeorm';
import { PlayerStatsByTeam } from './entities/player-stats-by-teams.entity';

@Injectable()
export class PlayerStatsService {
  constructor(
    @InjectRepository(PlayerStatsByLeague)
    private readonly playerStatsByLeagueRepository: Repository<PlayerStatsByLeague>,
    @InjectRepository(PlayerStatsByTeam)
    private readonly playerStatsByTeamRepository: Repository<PlayerStatsByTeam>,
  ) {}

  async playerStatsByLeagues(playerId: number): Promise<PlayerStatsByLeague[]> {
    const playerStatsByLeagues = await this.playerStatsByLeagueRepository.query(
      `SELECT tournaments.league_id, leagues.short_name,
      SUM(players_tournaments.games) as games_t, SUM(players_tournaments.goals) as goals_t,
      MIN(tournaments.season_id) as year_start, MAX(tournaments.season_id) as year_end, 
      COUNT(*) as years FROM players_tournaments
      INNER JOIN teams_tournaments ON players_tournaments.teams_tournament_id = teams_tournaments.id
      INNER JOIN tournaments ON teams_tournaments.tournament_id = tournaments.id
      INNER JOIN players ON players_tournaments.player_id = players.id
      INNER JOIN leagues ON tournaments.league_id = leagues.id
      WHERE players_tournaments.player_id = $1
      GROUP BY tournaments.league_id, leagues.short_name
      ORDER BY leagues.short_name`,
      [playerId],
    );
    return playerStatsByLeagues;
  }

  async playerStatsByTeams(playerId: number): Promise<PlayerStatsByTeam[]> {
    const playerStatsByTeams = await this.playerStatsByTeamRepository.query(
      `SELECT teams_tournaments.team_id, teams.full_name, nations.flag,
      SUM(players_tournaments.games) as games_t, SUM(players_tournaments.goals) as goals_t,
      MIN(tournaments.season_id) as year_start, MAX(tournaments.season_id) as year_end, 
      COUNT(*) as years FROM players_tournaments
      INNER JOIN teams_tournaments ON players_tournaments.teams_tournament_id = teams_tournaments.id
      INNER JOIN tournaments ON teams_tournaments.tournament_id = tournaments.id
      INNER JOIN players ON players_tournaments.player_id = players.id
      INNER JOIN teams ON teams_tournaments.team_id = teams.id
      INNER JOIN nations ON teams.nation_id = nations.id
      WHERE players_tournaments.player_id = $1
      GROUP BY teams_tournaments.team_id, teams.full_name, nations.flag
      ORDER BY teams.full_name`,
      [playerId],
    );
    return playerStatsByTeams;
  }
}
