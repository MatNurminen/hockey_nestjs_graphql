import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FreeAgent } from './entities/free-agent.entity/free-agent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FreeAgentsService {
  constructor(
    @InjectRepository(FreeAgent)
    private readonly freeAgentRepository: Repository<FreeAgent>,
  ) {}

  async freeAgents(seasonId: number, nationId: number): Promise<FreeAgent[]> {
    const freeAgents = await this.freeAgentRepository.query(
      `SELECT players_tournaments.id AS pt_id, players.*, nations.flag
          FROM players_tournaments
          INNER JOIN teams_tournaments ON players_tournaments.teams_tournament_id = teams_tournaments.id
          INNER JOIN tournaments ON teams_tournaments.tournament_id = tournaments.id
          RIGHT JOIN players ON players_tournaments.player_id = players.id AND tournaments.season_id = $1
          INNER JOIN nations ON players.nation_id = nations.id
          WHERE players_tournaments.id IS NULL
          AND players.start_year <= $1 AND (end_year > $1 OR end_year ISNULL)
          AND nation_id = $2`,
      [seasonId, nationId],
    );
    return freeAgents;
  }
}
