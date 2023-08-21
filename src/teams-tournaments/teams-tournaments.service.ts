import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateTeamTournamentInput } from './dto/create-team-tournament.input';
import { UpdateTeamTournamentInput } from './dto/update-team-tournament.input';
import { TeamTournament } from './entities/team-tournament.entity';

@Injectable()
export class TeamsTournamentsService {
  constructor(
    @InjectRepository(TeamTournament)
    private readonly teamTournamentRepository: Repository<TeamTournament>,
  ) {}

  async findAll() {
    return this.teamTournamentRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const teamTournament = await this.teamTournamentRepository.findOne({
      where: { id },
    });
    if (!teamTournament) {
      throw new NotFoundException(`Team Tournament  #${id} does not exist`);
    }
    return teamTournament;
  }

  async create(createTeamTournamentInput: CreateTeamTournamentInput) {
    const teamTournament = this.teamTournamentRepository.create(
      createTeamTournamentInput,
    );
    return this.teamTournamentRepository.save(teamTournament);
  }

  async update(
    id: number,
    updateTeamTournamentInput: UpdateTeamTournamentInput,
  ) {
    const teamTournament = await this.teamTournamentRepository.preload({
      id,
      ...updateTeamTournamentInput,
    });
    if (!teamTournament) {
      throw new UserInputError(`Team Tournament #${id} does not exist`);
    }
    return this.teamTournamentRepository.save(teamTournament);
  }

  async remove(id: number) {
    const teamTournament = await this.findOne(id);
    return this.teamTournamentRepository.remove(teamTournament);
  }
}
