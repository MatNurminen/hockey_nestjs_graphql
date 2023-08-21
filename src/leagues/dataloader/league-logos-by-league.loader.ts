import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { League } from '../entities/league.entity';
import { LeagueLogo } from '../../league-logos/entities/league-logo.entity';
import { In, Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class LogosByLeagueLoader extends DataLoader<number, LeagueLogo[]> {
  constructor(
    @InjectRepository(League)
    private readonly leaguesRepository: Repository<League>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(
    leagueIds: readonly number[],
  ): Promise<LeagueLogo[][]> {
    const leaguesWithLogos = await this.leaguesRepository.find({
      select: ['id'],
      order: {
        name: 'ASC',
        id: 'ASC',
      },
      relations: {
        logos: true,
      },
      where: {
        id: In(leagueIds as number[]),
      },
    });

    return leaguesWithLogos.map((league) => league.logos);
  }
}
