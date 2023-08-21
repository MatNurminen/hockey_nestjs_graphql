import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Nation } from '../entities/nation.entity';
import { In, Repository } from 'typeorm';
import { Player } from '../../players/entities/player.entity';

@Injectable({ scope: Scope.REQUEST })
export class PlayersByNationLoader extends DataLoader<number, Player[]> {
  constructor(
    @InjectRepository(Nation)
    private readonly nationsRepository: Repository<Nation>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(nationIds: readonly number[]): Promise<Player[][]> {
    const nationsWithPlayers = await this.nationsRepository.find({
      select: ['id'],
      order: {
        id: 'ASC',
      },
      relations: {
        players: true,
      },
      where: {
        id: In(nationIds as number[]),
      },
    });

    return nationsWithPlayers.map((nation) => nation.players);
  }
}
