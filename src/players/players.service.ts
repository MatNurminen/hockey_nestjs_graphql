import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { ILike, Repository } from 'typeorm';
import { CreatePlayerInput } from './dto/create-player.input';
import { UpdatePlayerInput } from './dto/update-player.input';
import { Player } from './entities/player.entity';
import { PlayerDbCountByNation } from './entities/player-db-count-by-nation.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
    @InjectRepository(PlayerDbCountByNation)
    private readonly playerDbCountByNationRepository: Repository<PlayerDbCountByNation>,
  ) {}

  async findAll(
    take?: number,
    filter?: string,
    args: {} = { take: take, filter: filter },
  ) {
    return this.playersRepository.find({
      order: {
        id: 'ASC',
      },
      where: filter
        ? [
            { first_name: ILike(`%${filter}%`) },
            { last_name: ILike(`%${filter}%`) },
          ]
        : null,
      ...args,
    });
  }

  async findOne(id: number) {
    const player = await this.playersRepository.findOne({ where: { id } });
    if (!player) {
      throw new NotFoundException(`Player #${id} does not exist`);
    }
    return player;
  }

  async create(createPlayerInput: CreatePlayerInput) {
    const player = this.playersRepository.create(createPlayerInput);
    return this.playersRepository.save(player);
  }

  async update(id: number, updatePlayerInput: UpdatePlayerInput) {
    const player = await this.playersRepository.preload({
      id,
      ...updatePlayerInput,
    });
    if (!player) {
      throw new UserInputError(`Player #${id} does not exist`);
    }
    return this.playersRepository.save(player);
  }

  async remove(id: number) {
    const player = await this.findOne(id);
    return this.playersRepository.remove(player);
  }

  async playersDbCountByNation(nationId: number) {
    const playersDbCountByNation =
      await this.playerDbCountByNationRepository.query(
        `SELECT COUNT(id) as plrs FROM players WHERE nation_id = $1`,
        [nationId],
      );
    return playersDbCountByNation;
  }
}
