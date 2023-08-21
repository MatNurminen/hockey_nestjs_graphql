import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { League } from '../entities/league.entity';
import { In, Repository } from 'typeorm';
import { Tournament } from '../../tournaments/entities/tournament.entity';

@Injectable({ scope: Scope.REQUEST })
export class TournamentsByLeagueLoader extends DataLoader<
  number,
  Tournament[]
> {
  constructor(
    @InjectRepository(League)
    private readonly leaguesRepository: Repository<League>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(
    leagueIds: readonly number[],
  ): Promise<Tournament[][]> {
    const leaguesWithTournaments = await this.leaguesRepository.find({
      select: ['id'],
      order: {
        id: 'ASC',
      },
      relations: {
        tournaments: true,
      },
      where: {
        id: In(leagueIds as number[]),
      },
    });

    return leaguesWithTournaments.map((league) => league.tournaments);
  }
}
