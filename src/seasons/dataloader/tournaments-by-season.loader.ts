import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { Tournament } from '../../tournaments/entities/tournament.entity';
import { Season } from '../entities/season.entity';

@Injectable({ scope: Scope.REQUEST })
export class TournamentsBySeasonLoader extends DataLoader<
  number,
  Tournament[]
> {
  constructor(
    @InjectRepository(Season)
    private readonly seasonsRepository: Repository<Season>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(
    tournamentIds: readonly number[],
  ): Promise<Tournament[][]> {
    const seasonsWithTournaments = await this.seasonsRepository.find({
      select: ['id'],
      order: {
        id: 'ASC',
      },
      relations: {
        tournaments: true,
      },
      where: {
        id: In(tournamentIds as number[]),
      },
    });

    return seasonsWithTournaments.map((season) => season.tournaments);
  }
}
