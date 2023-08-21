import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePlayerTournamentInput } from './dto/create-player-tournament.input';
import { UpdatePlayerTournamentInput } from './dto/update-player-tournament.input';
import { PlayerTournament } from './entities/player-tournament.entity';
import { PlayersTournamentsService } from './players-tournaments.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver()
export class PlayersTournamentsResolver {
  constructor(
    @InjectRepository(PlayerTournament)
    private playerTournament: Repository<PlayerTournament>,
    private readonly playersTournamentsService: PlayersTournamentsService,
  ) {}

  @Query(() => [PlayerTournament], { name: 'playersTournaments' })
  async findAll() {
    return this.playersTournamentsService.findAll();
  }

  @Query(() => PlayerTournament, { name: 'playerTournament' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.playersTournamentsService.findOne(id);
  }

  @Mutation(() => PlayerTournament, { name: 'createPlayerTournament' })
  async create(
    @Args('createPlayerTournamentInput')
    createPlayerTournamentInput: CreatePlayerTournamentInput,
  ) {
    return this.playersTournamentsService.create(createPlayerTournamentInput);
  }

  @Mutation(() => PlayerTournament, {
    name: 'updatePlayerTournament',
  })
  async update(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updatePlayerTournamentInput')
    updatePlayerTournamentInput: UpdatePlayerTournamentInput,
  ) {
    return this.playersTournamentsService.update(
      id,
      updatePlayerTournamentInput,
    );
  }

  @Mutation(() => PlayerTournament, { name: 'removePlayerTournament' })
  async remove(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.playersTournamentsService.remove(id);
  }
}
