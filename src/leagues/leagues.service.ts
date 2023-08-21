import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateLeagueInput } from './dto/create-league.input';
import { UpdateLeagueInput } from './dto/update-league.input';
import { League } from './entities/league.entity';

@Injectable()
export class LeaguesService {
  constructor(
    @InjectRepository(League)
    private readonly leaguesRepository: Repository<League>,
  ) {}

  async findAll(): Promise<League[]> {
    return this.leaguesRepository.find({
      order: {
        name: 'ASC',
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const league = await this.leaguesRepository.findOne({ where: { id } });
    if (!league) {
      throw new NotFoundException(`League #${id} does not exist`);
    }
    return league;
  }

  async create(createLeagueInput: CreateLeagueInput) {
    const league = this.leaguesRepository.create(createLeagueInput);
    return this.leaguesRepository.save(league);
  }

  async update(id: number, updateLeagueInput: UpdateLeagueInput) {
    const league = await this.leaguesRepository.preload({
      id,
      ...updateLeagueInput,
    });
    if (!league) {
      throw new UserInputError(`League #${id} does not exist`);
    }
    return this.leaguesRepository.save(league);
  }

  async remove(id: number) {
    const league = await this.findOne(id);
    return this.leaguesRepository.remove(league);
  }
}
