import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateLeagueLogoInput } from './dto/create-league-logo.input';
import { UpdateLeagueLogoInput } from './dto/update-league-logo.input';
import { LeagueLogo } from './entities/league-logo.entity';

@Injectable()
export class LeagueLogosService {
  constructor(
    @InjectRepository(LeagueLogo)
    private leagueLogoRepository: Repository<LeagueLogo>,
  ) {}

  findAll(): Promise<LeagueLogo[]> {
    return this.leagueLogoRepository.find();
  }

  async findOne(id: number): Promise<LeagueLogo> {
    const logo = await this.leagueLogoRepository.findOneBy({ id: id });
    if (!logo) {
      throw new UserInputError(`Logo #${id} does not exist`);
    }
    return logo;
  }

  async create(createLeagueInput: CreateLeagueLogoInput) {
    const logo = this.leagueLogoRepository.create(createLeagueInput);
    return this.leagueLogoRepository.save(logo);
  }

  async update(id: number, updateLeagueLogoInput: UpdateLeagueLogoInput) {
    const logo = await this.leagueLogoRepository.preload({
      id,
      ...updateLeagueLogoInput,
    });
    if (!logo) {
      throw new UserInputError(`Logo #${id} does not exist`);
    }
    return this.leagueLogoRepository.save(logo);
  }

  async remove(id: number) {
    const logo = await this.findOne(id);
    return this.leagueLogoRepository.remove(logo);
  }
}
