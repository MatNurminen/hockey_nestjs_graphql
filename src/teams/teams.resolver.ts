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
import { TeamTournament } from '../teams-tournaments/entities/team-tournament.entity';
import { TeamLogo } from '../team-logos/entities/team-logo.entity';
import { LogosByTeamLoader } from './dataloader/team-logos-by-team.loader';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Team } from './entities/team.entity';
import { TeamsService } from './teams.service';
import { TeamsTurnamentsByTeamLoader } from './dataloader/teams-turnaments-by-team.loader';
import { Nation } from '../nations/entities/nation.entity';
import { NationsService } from '../nations/nations.service';
import { Player } from '../players/entities/player.entity';
import { DraftsByTeamLoader } from './dataloader/team-drafts-by-team.loader';
import { NationByTeamLoader } from './dataloader/team-nation-by-team.loader';
import { TeamDbCountByNation } from './entities/team-db-count-by-nation-entity';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly logosByTeamsLoader: LogosByTeamLoader,
    private readonly teamsTurnamentsByTeamLoader: TeamsTurnamentsByTeamLoader,
    private readonly draftsByTeamLoader: DraftsByTeamLoader,
    private readonly nationByTeamLoader: NationByTeamLoader,
    @InjectRepository(TeamDbCountByNation)
    private readonly teamDbCountByNation: TeamDbCountByNation,
    private readonly nationsService: NationsService,
  ) {}

  @ResolveField(() => [TeamLogo])
  async logos(@Parent() team: Team) {
    return await this.logosByTeamsLoader.load(team.id);
  }

  @ResolveField(() => [TeamTournament])
  async teamsTournaments(@Parent() team: Team) {
    return await this.teamsTurnamentsByTeamLoader.load(team.id);
  }

  @ResolveField(() => Nation)
  async nation(@Parent() team: Team) {
    return await this.nationByTeamLoader.load(team.id);
  }

  @ResolveField(() => [Player])
  async draft_players(@Parent() player: Player) {
    return await this.draftsByTeamLoader.load(player.id);
  }

  @Query(() => [Team], { name: 'teams' })
  async findAll(@Args('filter', { nullable: true }) filter: string) {
    return this.teamsService.findAll(filter);
  }

  @Query(() => Team, { name: 'team' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.teamsService.findOne(id);
  }

  @Mutation(() => Team, { name: 'createTeam' })
  async create(@Args('createTeamInput') createTeamInput: CreateTeamInput) {
    return this.teamsService.create(createTeamInput);
  }

  @Mutation(() => Team, { name: 'updateTeam' })
  async update(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateTeamInput') updateTeamInput: UpdateTeamInput,
  ) {
    return this.teamsService.update(id, updateTeamInput);
  }

  @Mutation(() => Team, { name: 'removeTeam' })
  async remove(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.teamsService.remove(id);
  }

  @Query(() => [TeamDbCountByNation], { name: 'teamsByNationCount' })
  async teamsByNationCount(
    @Args('nationId', { type: () => ID }, ParseIntPipe) nationId: number,
  ) {
    return this.teamsService.teamsByNationCount(nationId);
  }
}
