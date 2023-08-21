import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { TeamTournament } from '../../teams-tournaments/entities/team-tournament.entity';
import { In, Repository } from 'typeorm';
import { Tournament } from '../entities/tournament.entity';

@Injectable({ scope: Scope.REQUEST })
export class TeamsByTournamentLoader extends DataLoader<
  number,
  TeamTournament[]
> {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentsRepository: Repository<Tournament>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(
    tournamentIds: readonly number[],
  ): Promise<TeamTournament[][]> {
    const tournamentsWithTeams = await this.tournamentsRepository.find({
      select: ['id'],
      order: {
        id: 'ASC',
      },
      relations: {
        teamsTournaments: true,
      },
      where: {
        id: In(tournamentIds as number[]),
      },
    });

    return tournamentsWithTeams.map(
      (tournament) => tournament.teamsTournaments,
    );
  }
}
