import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentByLeague } from './entities/tournaments-by-league';
import { Repository } from 'typeorm';
import { TournamentTeamDet } from './entities/tournament-teams-dets';

@Injectable()
export class TournamentsStatsService {
  constructor(
    @InjectRepository(TournamentByLeague)
    private readonly tournamentByLeagueRepository: Repository<TournamentByLeague>,
    @InjectRepository(TournamentTeamDet)
    private readonly tournamentTeamDetRepository: Repository<TournamentTeamDet>,
  ) {}

  async tournamentsByLeague(leagueId: number): Promise<TournamentByLeague[]> {
    const tournamentsByLeague = await this.tournamentByLeagueRepository.query(
      `SELECT tournaments.*, seasons.name as season, leagues.name as league 
      FROM tournaments 
      INNER JOIN seasons ON tournaments.season_id = seasons.id 
      INNER JOIN leagues ON tournaments.league_id = leagues.id 
      WHERE league_id = $1 ORDER BY season_id DESC`,
      [leagueId],
    );
    return tournamentsByLeague;
  }

  async tournamentTeamsDets(id: number): Promise<TournamentTeamDet[]> {
    const tournamentTeamsDets = await this.tournamentTeamDetRepository.query(
      `SELECT teams_tournaments.id, teams_tournaments.team_id, teams.full_name, 
      nations.flag, tournaments.league_id, leagues.name AS league_name, 
      tournaments.season_id, seasons.name AS season_name
      FROM teams_tournaments
      INNER JOIN tournaments ON teams_tournaments.tournament_id = tournaments.id
      INNER JOIN teams ON teams_tournaments.team_id = teams.id
      INNER JOIN nations ON teams.nation_id = nations.id
      INNER JOIN leagues ON tournaments.league_id = leagues.id
      INNER JOIN seasons ON tournaments.season_id = seasons.id
      WHERE teams_tournaments.tournament_id = $1
      ORDER BY full_name`,
      [id],
    );
    return tournamentTeamsDets;
  }
}
