import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { Tournament } from '../entities/tournament.entity';
import { League } from '../../leagues/entities/league.entity';

@Injectable({ scope: Scope.REQUEST })
export class LeagueByTournamentLoader extends DataLoader<number, League> {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentsRepository: Repository<Tournament>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(
    tournamentIds: readonly number[],
  ): Promise<League[]> {
    const tournamentsWithLeague = await this.tournamentsRepository.find({
      select: ['id'],
      order: {
        id: 'ASC',
      },
      relations: {
        league: true,
      },
      where: {
        id: In(tournamentIds as number[]),
      },
    });

    return tournamentsWithLeague.map((tournament) => tournament.league);
  }
}
