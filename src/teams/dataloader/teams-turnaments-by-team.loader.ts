import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { TeamTournament } from '../../teams-tournaments/entities/team-tournament.entity';
import { In, Repository } from 'typeorm';
import { Team } from '../entities/team.entity';

@Injectable({ scope: Scope.REQUEST })
export class TeamsTurnamentsByTeamLoader extends DataLoader<
  number,
  TeamTournament[]
> {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(
    teamIds: readonly number[],
  ): Promise<TeamTournament[][]> {
    const teamsWithTournaments = await this.teamsRepository.find({
      select: ['id'],
      order: {
        id: 'ASC',
      },
      relations: {
        teamsTournaments: true,
      },
      where: {
        id: In(teamIds as number[]),
      },
    });

    return teamsWithTournaments.map((team) => team.teamsTournaments);
  }
}
