import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { Tournament } from '../entities/tournament.entity';
import { Season } from '../../seasons/entities/season.entity';

@Injectable({ scope: Scope.REQUEST })
export class SeasonByTournamentLoader extends DataLoader<number, Season> {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentsRepository: Repository<Tournament>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(seasonIds: readonly number[]): Promise<Season[]> {
    const tournamentsWithSeason = await this.tournamentsRepository.find({
      select: ['id'],
      order: {
        id: 'ASC',
      },
      relations: {
        season: true,
      },
      where: {
        id: In(seasonIds as number[]),
      },
    });

    return tournamentsWithSeason.map((tournament) => tournament.season);
  }
}
