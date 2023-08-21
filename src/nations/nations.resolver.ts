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
import { Player } from '../players/entities/player.entity';
import { Team } from '../teams/entities/team.entity';
import { PlayersByNationLoader } from './dataloader/players-by-nation.loader';
import { TeamsByNationLoader } from './dataloader/teams-by-nation.loader';
import { CreateNationInput } from './dto/create-nation.input';
import { UpdateNationInput } from './dto/update-nation.input';
import { Nation } from './entities/nation.entity';
import { NationsService } from './nations.service';

@Resolver(() => Nation)
export class NationsResolver {
  constructor(
    private readonly nationsService: NationsService,
    private readonly teamsByNationLoader: TeamsByNationLoader,
    private readonly playersByNationLoader: PlayersByNationLoader,
  ) {}

  @ResolveField(() => [Team])
  async teams(@Parent() nation: Nation) {
    return await this.teamsByNationLoader.load(nation.id);
  }

  @ResolveField(() => [Player])
  async players(@Parent() nation: Player) {
    return await this.playersByNationLoader.load(nation.id);
  }

  @Query(() => [Nation], { name: 'nations' })
  async findAll() {
    return this.nationsService.findAll();
  }

  @Query(() => Nation, { name: 'nation' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.nationsService.findOne(id);
  }

  @Mutation(() => Nation, { name: 'createNation' })
  async create(
    @Args('createNationInput') createNationInput: CreateNationInput,
  ) {
    return this.nationsService.create(createNationInput);
  }

  @Mutation(() => Nation, { name: 'updateNation' })
  async update(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateNationInput') updateNationInput: UpdateNationInput,
  ) {
    return this.nationsService.update(id, updateNationInput);
  }

  @Mutation(() => Nation, { name: 'removeNation' })
  async remove(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.nationsService.remove(id);
  }
}
