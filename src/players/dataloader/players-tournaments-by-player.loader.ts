import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { PlayerTournament } from '../../players-tournaments/entities/player-tournament.entity';
import { Player } from '../entities/player.entity';

@Injectable({ scope: Scope.REQUEST })
export class TournamentsByPlayerLoader extends DataLoader<
  number,
  PlayerTournament[]
> {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(
    playerIds: readonly number[],
  ): Promise<PlayerTournament[][]> {
    const playersWithTournaments = await this.playersRepository.find({
      select: ['id'],
      order: {
        id: 'ASC',
      },
      relations: {
        playersTournaments: true,
      },
      where: {
        id: In(playerIds as number[]),
      },
    });

    return playersWithTournaments.map((player) => player.playersTournaments);
  }
}
