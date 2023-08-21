import { ParseIntPipe } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreatePlayerInput } from './dto/create-player.input';
import { UpdatePlayerInput } from './dto/update-player.input';
import { Player } from './entities/player.entity';
import { PlayersService } from './players.service';
import { TournamentsByPlayerLoader } from './dataloader/players-tournaments-by-player.loader';
import { PlayerTournament } from '../players-tournaments/entities/player-tournament.entity';
import { Nation } from '../nations/entities/nation.entity';
import { NationsService } from '../nations/nations.service';
import { Team } from '../teams/entities/team.entity';
import { TeamsService } from '../teams/teams.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerDbCountByNation } from './entities/player-db-count-by-nation.entity';
import { NationByPlayerLoader } from './dataloader/player-nation-by-team.loader';

@Resolver(() => Player)
export class PlayersResolver {
  constructor(
    private readonly playersService: PlayersService,
    private readonly tournamentsByPlayerLoader: TournamentsByPlayerLoader,
    private readonly nationByPlayerLoader: NationByPlayerLoader,
    private readonly nationsService: NationsService,
    private readonly teamsService: TeamsService,
    @InjectRepository(PlayerDbCountByNation)
    private playerDbCountByNation: PlayerDbCountByNation,
  ) {}

  @ResolveField(() => Nation)
  async nation(@Parent() player: Player) {
    return await this.nationByPlayerLoader.load(player.id);
  }

  @ResolveField(() => [PlayerTournament])
  async playersTournaments(@Parent() player: Player) {
    return await this.tournamentsByPlayerLoader.load(player.id);
  }

  @ResolveField(() => Team)
  async draft_team(@Parent() player: Player) {
    if (player.draft_team_id) {
      return await this.teamsService.findOne(player.draft_team_id);
    }
  }

  @Query(() => [Player], { name: 'players' })
  async findAll(
    @Args('take', { nullable: true }) take: number,
    @Args('filter', { nullable: true }) filter: string,
  ) {
    return this.playersService.findAll(take, filter);
  }

  @Query(() => Player, { name: 'player' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.playersService.findOne(id);
  }

  @Mutation(() => Player, { name: 'createPlayer' })
  async create(
    @Args('createPlayerInput') createPlayerInput: CreatePlayerInput,
  ) {
    return this.playersService.create(createPlayerInput);
  }

  @Mutation(() => Player, { name: 'updatePlayer' })
  async update(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updatePlayerInput') updatePlayerInput: UpdatePlayerInput,
  ) {
    return this.playersService.update(id, updatePlayerInput);
  }

  @Mutation(() => Player, { name: 'removePlayer' })
  async remove(@Args('id', ParseIntPipe) id: number) {
    return this.playersService.remove(id);
  }

  @Query(() => [PlayerDbCountByNation], { name: 'playersDbCountByNation' })
  async playersDbCountByNation(
    @Args('nationId', { type: () => ID }, ParseIntPipe) nationId: number,
  ) {
    return this.playersService.playersDbCountByNation(nationId);
  }
}
