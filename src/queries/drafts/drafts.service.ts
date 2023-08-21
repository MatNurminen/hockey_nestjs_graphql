import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DraftByNation } from './entities/draft-by-nation.entity';
import { DraftByTeam } from './entities/draft-by-team.entity';
import { DraftDetail } from './entities/draft-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DraftsService {
  constructor(
    @InjectRepository(DraftByNation)
    private readonly draftByNationRepository: Repository<DraftByNation>,
    @InjectRepository(DraftByTeam)
    private readonly draftByTeamRepository: Repository<DraftByTeam>,
    @InjectRepository(DraftDetail)
    private readonly draftDetailRepository: Repository<DraftDetail>,
  ) {}

  async draftByNations() {
    const draftByNations = await this.draftByNationRepository.query(
      `SELECT nations.id, nations.name, nations.flag, COUNT(players.id) as plrs      
      FROM players INNER JOIN teams ON players.draft_team_id = teams.id 
      INNER JOIN nations ON players.nation_id = nations.id 
      GROUP BY (nations.id, nations.name, nations.flag) 
      ORDER BY nations.name`,
    );
    return draftByNations;
  }

  async draftByTeams() {
    const draftByTeams = await this.draftByTeamRepository.query(
      `SELECT teams.id, teams.full_name, team_logos.logo, 
      COUNT(players.id) as plrs FROM players
      INNER JOIN teams ON players.draft_team_id = teams.id
      INNER JOIN team_logos ON teams.id = team_logos.team_id
      WHERE team_logos.end_year IS NULL
      GROUP BY (teams.id, teams.full_name, team_logos.logo)
      ORDER BY teams.full_name`,
    );
    return draftByTeams;
  }

  async draftDetails(
    teamId?: number,
    nationId?: number,
  ): Promise<DraftDetail[]> {
    let query = `SELECT tournaments.league_id, leagues.short_name, players.id, 
      players.player_position, players.first_name, players.last_name, players.draft_team_id, 
      teams.full_name, nations.name, nations.flag,
      SUM(players_tournaments.games) as games_t, SUM(players_tournaments.goals) as goals_t,
      COUNT(tournaments.league_id) AS years_t
      FROM players_tournaments
      INNER JOIN teams_tournaments ON players_tournaments.teams_tournament_id = teams_tournaments.id
      INNER JOIN tournaments ON teams_tournaments.tournament_id = tournaments.id
      INNER JOIN leagues ON tournaments.league_id = leagues.id
      RIGHT JOIN players ON players_tournaments.player_id = players.id AND tournaments.league_id = 14
      INNER JOIN nations ON players.nation_id = nations.id
      INNER JOIN teams ON players.draft_team_id = teams.id
      WHERE players.draft_team_id IS NOT NULL`;
    const params = [];
    if (teamId) {
      query += ` AND players.draft_team_id = $${params.length + 1}`;
      params.push(teamId);
    }
    if (nationId) {
      query += ` AND players.nation_id = $${params.length + 1}`;
      params.push(nationId);
    }
    query += `GROUP BY tournaments.league_id, leagues.short_name, players.id, players.player_position, players.first_name, 
      players.last_name, players.draft_team_id, teams.full_name, nations.name, nations.flag
      ORDER BY players.last_name`;
    const draftDetails = await this.draftDetailRepository.query(query, params);
    return draftDetails;
  }
}
