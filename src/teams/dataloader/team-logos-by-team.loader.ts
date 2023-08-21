import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { TeamLogo } from '../../team-logos/entities/team-logo.entity';
import { Team } from '../entities/team.entity';

@Injectable({ scope: Scope.REQUEST })
export class LogosByTeamLoader extends DataLoader<number, TeamLogo[]> {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(teamIds: readonly number[]): Promise<TeamLogo[][]> {
    const teamsWithLogos = await this.teamsRepository.find({
      select: ['id'],
      order: {
        full_name: 'ASC',
        id: 'ASC',
      },
      relations: {
        logos: true,
      },
      where: {
        id: In(teamIds as number[]),
      },
    });

    return teamsWithLogos.map((team) => team.logos);
  }
}
