import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { Nation } from '../../nations/entities/nation.entity';

@Injectable({ scope: Scope.REQUEST })
export class NationByTeamLoader extends DataLoader<number, Nation> {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(teamIds: readonly number[]): Promise<Nation[]> {
    const teamsWithNation = await this.teamsRepository.find({
      select: ['id'],
      order: {
        full_name: 'ASC',
        id: 'ASC',
      },
      relations: {
        nation: true,
      },
      where: {
        id: In(teamIds as number[]),
      },
    });

    return teamsWithNation.map((team) => team.nation);
  }
}
