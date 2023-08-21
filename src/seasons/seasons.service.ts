import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateSeasonInput } from './dto/create-season.input';
import { UpdateSeasonInput } from './dto/update-season.input';
import { Season } from './entities/season.entity';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Season)
    private readonly seasonsRepository: Repository<Season>,
  ) {}

  async findAll() {
    return this.seasonsRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const season = await this.seasonsRepository.findOne({ where: { id } });
    if (!season) {
      throw new NotFoundException(`Season #${id} does not exist`);
    }
    return season;
  }

  async create(createLeagueInput: CreateSeasonInput) {
    const season = this.seasonsRepository.create(createLeagueInput);
    return this.seasonsRepository.save(season);
  }

  async update(id: number, updateSeasonInput: UpdateSeasonInput) {
    const season = await this.seasonsRepository.preload({
      id,
      ...updateSeasonInput,
    });
    if (!season) {
      throw new UserInputError(`League #${id} does not exist`);
    }
    return this.seasonsRepository.save(season);
  }

  async remove(id: number) {
    const season = await this.findOne(id);
    return this.seasonsRepository.remove(season);
  }
}
