import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerStatDetail } from './entities/player-stat-detail.entity';
import { Repository } from 'typeorm';
import { PlayerStatTotal } from './entities/player-stat-total.entity';
import { PlayerCountByNation } from './entities/player-count-by-nation.entity';
import { PlayerComparisonByTeam } from './entities/player-comparison-by-team.entity';
import { Roster } from './entities/roster.entity';

@Injectable()
export class PlayersStatsDetailsService {
  constructor(
    @InjectRepository(PlayerStatDetail)
    private readonly playerStatDetailRepository: Repository<PlayerStatDetail>,
    @InjectRepository(PlayerStatTotal)
    private readonly playerStatTotalRepository: Repository<PlayerStatTotal>,
    @InjectRepository(PlayerCountByNation)
    private readonly playerCountByNationRepository: Repository<PlayerCountByNation>,
    @InjectRepository(PlayerComparisonByTeam)
    private readonly playerComparisonByTeamRepository: Repository<PlayerComparisonByTeam>,
    @InjectRepository(Roster)
    private readonly rosterRepository: Repository<Roster>,
  ) {}

  async playersStatsDetails(
    leagueId?: number,
    teamId?: number,
    seasonId?: number,
    nationId?: number,
    playerId?: number,
  ): Promise<PlayerStatDetail[]> {
    let query = `SELECT players_tournaments.*, players.*, tournaments.*, teams_tournaments.team_id, 
    teams.full_name, leagues.short_name, seasons.name, nations_player.flag AS player_flag, 
    nations_team.flag AS team_flag, leagues.is_local FROM players_tournaments
    INNER JOIN players ON players_tournaments.player_id = players.id
    INNER JOIN teams_tournaments ON players_tournaments.teams_tournament_id = teams_tournaments.id
    INNER JOIN teams ON teams_tournaments.team_id = teams.id
    INNER JOIN tournaments ON teams_tournaments.tournament_id = tournaments.id
    INNER JOIN leagues ON tournaments.league_id = leagues.id
    INNER JOIN seasons ON tournaments.season_id = seasons.id
    INNER JOIN nations AS nations_player ON players.nation_id = nations_player.id
    INNER JOIN nations AS nations_team ON teams.nation_id = nations_team.id
    WHERE 1=1`;
    const params = [];
    if (leagueId) {
      query += ` AND league_id = $${params.length + 1}`;
      params.push(leagueId);
    }
    if (teamId) {
      query += ` AND team_id = $${params.length + 1}`;
      params.push(teamId);
    }
    if (seasonId) {
      query += ` AND season_id = $${params.length + 1}`;
      params.push(seasonId);
    }
    if (nationId) {
      query += ` AND players.nation_id = $${params.length + 1}`;
      params.push(nationId);
    }
    if (playerId) {
      query += ` AND player_id = $${params.length + 1}`;
      params.push(playerId);
    }
    query += ` ORDER BY goals DESC`;
    const playersStatsDetails = await this.playerStatDetailRepository.query(
      query,
      params,
    );
    return playersStatsDetails;
  }

  async playersStatsTotal(
    leagueId?: number,
    teamId?: number,
    nationId?: number,
    limit?: number,
  ): Promise<PlayerStatTotal[]> {
    let query = `SELECT players_tournaments.player_id, players.first_name, players.last_name, 
      players.player_position, players.player_order, nations.flag AS player_flag, 
      SUM(players_tournaments.games) as games_t, SUM(players_tournaments.goals) as goals_t,
      MIN(tournaments.season_id) as start_year, MAX(tournaments.season_id) as end_year, 
      COUNT(*) as years FROM players_tournaments
      INNER JOIN teams_tournaments ON players_tournaments.teams_tournament_id = teams_tournaments.id
      INNER JOIN tournaments ON teams_tournaments.tournament_id = tournaments.id
      INNER JOIN players ON players_tournaments.player_id = players.id
      INNER JOIN nations ON players.nation_id = nations.id
      WHERE 1=1`;
    const params = [];
    if (leagueId) {
      query += ` AND tournaments.league_id = $${params.length + 1}`;
      params.push(leagueId);
    }
    if (teamId) {
      query += ` AND teams_tournaments.team_id = $${params.length + 1}`;
      params.push(teamId);
    }
    if (nationId) {
      query += ` AND nations.id = $${params.length + 1}`;
      params.push(nationId);
    }
    query += ` GROUP BY players_tournaments.player_id, players.first_name, players.last_name, 
      players.player_position, players.player_order, nations.flag
      ORDER BY goals_t DESC`;
    if (limit) {
      query += ` LIMIT $${params.length + 1}`;
      params.push(limit);
    }
    const playersStatsTotal = await this.playerStatTotalRepository.query(
      query,
      params,
    );
    return playersStatsTotal;
  }

  async countPlayersByNation(
    leagueId?: number,
    seasonId?: number,
    teamId?: number,
  ): Promise<PlayerCountByNation[]> {
    let query = `SELECT nations.id, nations.name, nations.flag, nations.color,
      COUNT(*) as count FROM players_tournaments
      INNER JOIN teams_tournaments ON players_tournaments.teams_tournament_id = teams_tournaments.id
      INNER JOIN tournaments ON teams_tournaments.tournament_id = tournaments.id
      INNER JOIN seasons ON tournaments.season_id = seasons.id
      INNER JOIN leagues ON tournaments.league_id = leagues.id
      INNER JOIN players ON players_tournaments.player_id = players.id
      INNER JOIN nations ON players.nation_id = nations.id
      WHERE 1=1`;
    const params = [];
    if (leagueId && seasonId) {
      query += ` AND tournaments.league_id = $${params.length + 1}`;
      params.push(leagueId);
      query += ` AND tournaments.season_id = $${params.length + 1}`;
      params.push(seasonId);
    }
    if (teamId) {
      query += ` AND teams_tournaments.team_id = $${params.length + 1}`;
      params.push(teamId);
    }
    query += ` GROUP BY nations.id, nations.name, nations.flag
      ORDER BY count DESC`;
    const countPlayersByNation = await this.playerCountByNationRepository.query(
      query,
      params,
    );
    return countPlayersByNation;
  }

  async playersComparisonByTeams(
    leagueId: number,
    seasonId: number,
  ): Promise<PlayerComparisonByTeam[]> {
    const playersComparisonByTeams =
      await this.playerComparisonByTeamRepository.query(
        `SELECT teams.id as team_id, teams.full_name, COUNT(players.id) as plrs,
      ROUND(AVG(players.height), 2) as avh, ROUND(AVG(players.weight), 2) as avw,
      ROUND(AVG(tournaments.season_id - players.birth_year), 2) as ava
      FROM players_tournaments
      INNER JOIN teams_tournaments ON players_tournaments.teams_tournament_id = teams_tournaments.id
      INNER JOIN tournaments ON teams_tournaments.tournament_id = tournaments.id
      INNER JOIN players ON players_tournaments.player_id = players.id
      INNER JOIN teams ON teams_tournaments.team_id = teams.id
      WHERE tournaments.league_id = $1 AND tournaments.season_id = $2
      GROUP BY teams.id, teams.full_name ORDER BY teams.full_name`,
        [leagueId, seasonId],
      );
    return playersComparisonByTeams;
  }

  async roster(leagueId: number, seasonId: number): Promise<Roster[]> {
    const roster = await this.rosterRepository.query(
      `SELECT players_tournaments.*, players.first_name, players.last_name, players.jersey_number, 
      players.player_position, players.player_order, players.nation_id, players.birth_year, players.height, 
      players.weight, players.draft_team_id, players.start_year, players.end_year, tournaments.season_id, 
      tournaments.league_id, teams.full_name, leagues.short_name, seasons.name, nations.flag, 
      league_logos.logo AS league_logo, team_logos.logo, draft_teams.logo AS draft_logo 
      FROM players_tournaments
      INNER JOIN players ON players_tournaments.player_id = players.id
      INNER JOIN teams_tournaments ON players_tournaments.teams_tournament_id = teams_tournaments.id
      INNER JOIN teams ON teams_tournaments.team_id = teams.id
      INNER JOIN tournaments ON teams_tournaments.tournament_id = tournaments.id
      INNER JOIN leagues ON tournaments.league_id = leagues.id
      INNER JOIN seasons ON tournaments.season_id = seasons.id
      INNER JOIN nations ON players.nation_id = nations.id
      INNER JOIN league_logos ON leagues.id = league_logos.league_id
      INNER JOIN team_logos ON teams.id = team_logos.team_id
      LEFT JOIN team_logos AS draft_teams ON players.draft_team_id = draft_teams.id
      WHERE league_logos.start_year <= $2 AND (league_logos.end_year >= $2 OR league_logos.end_year IS NULL)
      AND team_logos.start_year <= $2 AND (team_logos.end_year >= $2 OR team_logos.end_year IS NULL)
      AND leagues.id = $1 AND season_id = $2
      ORDER BY full_name, player_order, last_name`,
      [leagueId, seasonId],
    );
    return roster;
  }
}
