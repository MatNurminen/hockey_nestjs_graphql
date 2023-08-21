import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { Player } from '../../players/entities/player.entity';

@Injectable({ scope: Scope.REQUEST })
export class DraftsByTeamLoader extends DataLoader<number, Player[]> {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(teamIds: readonly number[]): Promise<Player[][]> {
    const teamsWithDrafts = await this.teamsRepository.find({
      select: ['id'],
      order: {
        full_name: 'ASC',
        id: 'ASC',
      },
      relations: {
        draft_players: true,
      },
      where: {
        id: In(teamIds as number[]),
      },
    });

    return teamsWithDrafts.map((team) => team.draft_players);
  }
}
