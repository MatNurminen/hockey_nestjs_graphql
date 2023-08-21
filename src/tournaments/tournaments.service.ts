import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { CreateTournamentInput } from './dto/create-tournament.input';
import { UpdateTournamentInput } from './dto/update-tournament.input';
import { Tournament } from './entities/tournament.entity';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentsRepository: Repository<Tournament>,
  ) {}

  async findAll() {
    return this.tournamentsRepository.find();
  }

  async findOne(id: number) {
    const tournament = await this.tournamentsRepository.findOne({
      where: { id },
    });
    if (!tournament) {
      throw new NotFoundException(`Tournament #${id} does not exist`);
    }
    return tournament;
  }

  async create(createTournamentInput: CreateTournamentInput) {
    const tournament = this.tournamentsRepository.create(createTournamentInput);
    return this.tournamentsRepository.save(tournament);
  }

  async update(id: number, updateTournamentInput: UpdateTournamentInput) {
    const tournament = await this.tournamentsRepository.preload({
      id,
      ...updateTournamentInput,
    });
    if (!tournament) {
      throw new UserInputError(`Tournament #${id} does not exist`);
    }
    return this.tournamentsRepository.save(tournament);
  }

  async remove(id: number) {
    const tournament = await this.findOne(id);
    return this.tournamentsRepository.remove(tournament);
  }
}
