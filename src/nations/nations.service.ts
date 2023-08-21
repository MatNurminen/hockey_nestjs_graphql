import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateNationInput } from './dto/create-nation.input';
import { UpdateNationInput } from './dto/update-nation.input';
import { Nation } from './entities/nation.entity';

@Injectable()
export class NationsService {
  constructor(
    @InjectRepository(Nation)
    private readonly nationsRepository: Repository<Nation>,
  ) {}

  async findAll() {
    return this.nationsRepository.find({
      order: {
        name: 'ASC',
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const nation = await this.nationsRepository.findOne({ where: { id } });
    if (!nation) {
      throw new NotFoundException(`Nation #${id} does not exist`);
    }
    return nation;
  }

  async create(createNationInput: CreateNationInput) {
    const nation = this.nationsRepository.create(createNationInput);
    return this.nationsRepository.save(nation);
  }

  async update(id: number, updateNationInput: UpdateNationInput) {
    const nation = await this.nationsRepository.preload({
      id,
      ...updateNationInput,
    });
    if (!nation) {
      throw new UserInputError(`Nation #${id} does not exist`);
    }
    return this.nationsRepository.save(nation);
  }

  async remove(id: number) {
    const nation = await this.findOne(id);
    return this.nationsRepository.remove(nation);
  }
}
