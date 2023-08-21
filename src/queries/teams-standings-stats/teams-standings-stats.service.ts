import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Standing } from './entities/standing.entity';
import { TeamBySeason } from './entities/team-by-season.entity';
import { Repository } from 'typeorm';
import { TeamByLeague } from './entities/team-by-league.entity';

@Injectable()
export class TeamsStandingsStatsService {
  constructor(
    @InjectRepository(Standing)
    private readonly standingRepository: Repository<Standing>,
    @InjectRepository(TeamBySeason)
    private readonly teamBySeasonRepository: Repository<TeamBySeason>,
    @InjectRepository(TeamByLeague)
    private readonly teamByLeagueRepository: Repository<TeamByLeague>,
  ) {}

  async standings(leagueId: number, seasonId: number): Promise<Standing[]> {
    const standings = await this.standingRepository.query(
      `SELECT teams_tournaments.*, teams_tournaments.goals_for - teams_tournaments.goals_against as gd, 
      teams_tournaments.wins * 2 + teams_tournaments.ties as pts, teams.full_name, tournaments.season_id, 
      leagues.name, seasons.name AS season, team_logos.logo FROM teams_tournaments 
      INNER JOIN teams ON teams_tournaments.team_id = teams.id
			INNER JOIN team_logos ON teams.id = team_logos.team_id
      INNER JOIN tournaments ON teams_tournaments.tournament_id = tournaments.id
      INNER JOIN leagues ON tournaments.league_id = leagues.id
      INNER JOIN seasons ON tournaments.season_id = seasons.id
      WHERE team_logos.start_year <= $2 AND (team_logos.end_year >= $2 OR team_logos.end_year IS NULL)
			AND tournaments.league_id = $1 AND tournaments.season_id = $2
			ORDER BY pts DESC`,
      [leagueId, seasonId],
    );
    return standings;
  }

  async teamsBySeasons(
    teamId: number,
    local: boolean,
  ): Promise<TeamBySeason[]> {
    const teamsBySeasons = await this.teamBySeasonRepository.query(
      `SELECT teams_tournaments.*, (wins*2 + ties) as pts, tournaments.season_id, 
      leagues.id as league_id, leagues.short_name FROM teams_tournaments 
      INNER JOIN tournaments ON tournaments.id = teams_tournaments.tournament_id 
      INNER JOIN seasons ON seasons.id = tournaments.season_id 
      INNER JOIN leagues ON leagues.id = tournaments.league_id 
      WHERE team_id = $1 AND leagues.is_local = $2 ORDER BY season_id`,
      [teamId, local],
    );
    return teamsBySeasons;
  }

  async teamsByLeague(leagueId: number): Promise<TeamByLeague[]> {
    const teamsByLeague = await this.teamByLeagueRepository.query(
      `SELECT teams.id, teams.nation_id, teams.full_name, nations.flag FROM teams
      INNER JOIN nations ON teams.nation_id = nations.id
      INNER JOIN teams_tournaments ON teams.id = teams_tournaments.team_id
      INNER JOIN tournaments ON teams_tournaments.tournament_id = tournaments.id
      WHERE tournaments.league_id = $1
      GROUP BY teams.id, teams.nation_id, teams.full_name, nations.flag
      ORDER BY teams.full_name`,
      [leagueId],
    );
    return teamsByLeague;
  }
}
