import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateTeamLogoInput } from './dto/create-team-logo.input';
import { UpdateTeamLogoInput } from './dto/update-team-logo.input';
import { TeamLogo } from './entities/team-logo.entity';

@Injectable()
export class TeamLogosService {
  constructor(
    @InjectRepository(TeamLogo)
    private teamLogoRepository: Repository<TeamLogo>,
  ) {}

  findAll(): Promise<TeamLogo[]> {
    return this.teamLogoRepository.find();
  }

  async findOne(id: number): Promise<TeamLogo> {
    const logo = await this.teamLogoRepository.findOneBy({ id: id });
    if (!logo) {
      throw new UserInputError(`Logo #${id} does not exist`);
    }
    return logo;
  }

  async create(createTeamLogoInput: CreateTeamLogoInput) {
    const logo = this.teamLogoRepository.create(createTeamLogoInput);
    return this.teamLogoRepository.save(logo);
  }

  async update(id: number, updateTeamLogoInput: UpdateTeamLogoInput) {
    const logo = await this.teamLogoRepository.preload({
      id,
      ...updateTeamLogoInput,
    });
    if (!logo) {
      throw new UserInputError(`Logo #${id} does not exist`);
    }
    return this.teamLogoRepository.save(logo);
  }

  async remove(id: number) {
    const logo = await this.findOne(id);
    return this.teamLogoRepository.remove(logo);
  }
}
