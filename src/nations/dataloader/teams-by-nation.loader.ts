import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Nation } from '../entities/nation.entity';
import { In, Repository } from 'typeorm';
import { TeamLogo } from '../../team-logos/entities/team-logo.entity';
import { Team } from '../../teams/entities/team.entity';

@Injectable({ scope: Scope.REQUEST })
export class TeamsByNationLoader extends DataLoader<number, Team[]> {
  constructor(
    @InjectRepository(Nation)
    private readonly nationsRepository: Repository<Nation>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(nationIds: readonly number[]): Promise<Team[][]> {
    const nationsWithTeams = await this.nationsRepository.find({
      select: ['id'],
      order: {
        id: 'ASC',
      },
      relations: {
        teams: true,
      },
      where: {
        id: In(nationIds as number[]),
      },
    });

    return nationsWithTeams.map((nation) => nation.teams);
  }
}
