import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreatePlayerTournamentInput } from './dto/create-player-tournament.input';
import { UpdatePlayerTournamentInput } from './dto/update-player-tournament.input';
import { PlayerTournament } from './entities/player-tournament.entity';

@Injectable()
export class PlayersTournamentsService {
  constructor(
    @InjectRepository(PlayerTournament)
    private readonly playerTournamentRepository: Repository<PlayerTournament>,
  ) {}

  async findAll() {
    return this.playerTournamentRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const player = await this.playerTournamentRepository.findOne({
      where: { id },
    });
    if (!player) {
      throw new NotFoundException(
        `Player Team Tournament #${id} does not exist`,
      );
    }
    return player;
  }

  async create(createPlayerTournamentInput: CreatePlayerTournamentInput) {
    const player = this.playerTournamentRepository.create(
      createPlayerTournamentInput,
    );
    return this.playerTournamentRepository.save(player);
  }

  async update(
    id: number,
    updatePlayerTeamTournamentInput: UpdatePlayerTournamentInput,
  ) {
    const player = await this.playerTournamentRepository.preload({
      id,
      ...updatePlayerTeamTournamentInput,
    });
    if (!player) {
      throw new UserInputError(`Player Tournament #${id} does not exist`);
    }
    return this.playerTournamentRepository.save(player);
  }

  async remove(id: number) {
    const player = await this.findOne(id);
    return this.playerTournamentRepository.remove(player);
  }
}
