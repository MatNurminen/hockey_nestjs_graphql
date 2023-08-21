import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { ILike, Repository } from 'typeorm';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team } from './entities/team.entity';
import { TeamDbCountByNation } from './entities/team-db-count-by-nation-entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
    @InjectRepository(TeamDbCountByNation)
    private readonly teamDbCountByNationRepository: Repository<TeamDbCountByNation>,
  ) {}

  async findAll(filter?: string, args: {} = { filter: filter }) {
    return this.teamsRepository.find({
      order: {
        full_name: 'ASC',
        id: 'ASC',
      },
      where: filter ? [{ full_name: ILike(`%${filter}%`) }] : null,
      ...args,
    });
  }

  async findOne(id: number) {
    const team = await this.teamsRepository.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException(`Team #${id} does not exist`);
    }
    return team;
  }

  async create(createTeamInput: CreateTeamInput) {
    const team = this.teamsRepository.create(createTeamInput);
    return this.teamsRepository.save(team);
  }

  async update(id: number, updateTeamInput: UpdateTeamInput) {
    const team = await this.teamsRepository.preload({
      id,
      ...updateTeamInput,
    });
    if (!team) {
      throw new UserInputError(`Team #${id} does not exist`);
    }
    return this.teamsRepository.save(team);
  }

  async remove(id: number) {
    const team = await this.findOne(id);
    return this.teamsRepository.remove(team);
  }

  async teamsByNationCount(nationId: number) {
    const teamsByNationCount = await this.teamDbCountByNationRepository.query(
      `SELECT COUNT(id) as tms FROM teams WHERE nation_id = $1`,
      [nationId],
    );
    return teamsByNationCount;
  }
}
