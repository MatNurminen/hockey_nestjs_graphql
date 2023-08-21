import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { Nation } from '../../nations/entities/nation.entity';

@Injectable({ scope: Scope.REQUEST })
export class NationByPlayerLoader extends DataLoader<number, Nation> {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(playerIds: readonly number[]): Promise<Nation[]> {
    const playersWithNation = await this.playersRepository.find({
      select: ['id'],
      order: {
        id: 'ASC',
      },
      relations: {
        nation: true,
      },
      where: {
        id: In(playerIds as number[]),
      },
    });

    return playersWithNation.map((player) => player.nation);
  }
}
