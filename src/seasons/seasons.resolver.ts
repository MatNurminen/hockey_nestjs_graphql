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
import { Tournament } from '../tournaments/entities/tournament.entity';
import { TournamentsBySeasonLoader } from './dataloader/tournaments-by-season.loader';
import { CreateSeasonInput } from './dto/create-season.input';
import { UpdateSeasonInput } from './dto/update-season.input';
import { Season } from './entities/season.entity';
import { SeasonsService } from './seasons.service';

@Resolver(() => Season)
export class SeasonsResolver {
  constructor(
    private readonly seasonsService: SeasonsService,
    private readonly tournamentsBySeasonLoader: TournamentsBySeasonLoader,
  ) {}

  @ResolveField(() => [Tournament])
  async tournaments(@Parent() season: Season) {
    return await this.tournamentsBySeasonLoader.load(season.id);
  }

  @Query(() => [Season], { name: 'seasons' })
  async findAll() {
    return this.seasonsService.findAll();
  }

  @Query(() => Season, { name: 'season' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.seasonsService.findOne(id);
  }

  @Mutation(() => Season, { name: 'createSeason' })
  async create(
    @Args('createSeasonInput') createLeagueInput: CreateSeasonInput,
  ) {
    return this.seasonsService.create(createLeagueInput);
  }

  @Mutation(() => Season, { name: 'updateSeason' })
  async update(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateSeasonInput') updateSeasonInput: UpdateSeasonInput,
  ) {
    return this.seasonsService.update(id, updateSeasonInput);
  }

  @Mutation(() => Season, { name: 'removeSeason' })
  async remove(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.seasonsService.remove(id);
  }
}
