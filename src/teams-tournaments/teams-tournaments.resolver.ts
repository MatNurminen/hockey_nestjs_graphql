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
import { PlayerTournament } from '../players-tournaments/entities/player-tournament.entity';
import { CreateTeamTournamentInput } from './dto/create-team-tournament.input';
import { UpdateTeamTournamentInput } from './dto/update-team-tournament.input';
import { TeamTournament } from './entities/team-tournament.entity';
import { TeamsTournamentsService } from './teams-tournaments.service';
import { Team } from '../teams/entities/team.entity';
import { TeamsService } from '../teams/teams.service';

@Resolver(() => TeamTournament)
export class TeamsTournamentsResolver {
  constructor(
    private readonly teamsTournamentsService: TeamsTournamentsService,
    private readonly teamsService: TeamsService,
  ) {}

  @ResolveField(() => Team)
  async team(@Parent() teamTournament: TeamTournament) {
    if (teamTournament.team_id) {
      return await this.teamsService.findOne(teamTournament.team_id);
    }
  }

  @Query(() => [TeamTournament], { name: 'teamsTournaments' })
  async findAll() {
    return this.teamsTournamentsService.findAll();
  }

  @Query(() => TeamTournament, { name: 'teamTournament' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.teamsTournamentsService.findOne(id);
  }

  @Mutation(() => TeamTournament, { name: 'createTeamTournament' })
  async create(
    @Args('createTeamTournamentInput')
    createTeamTournamentInput: CreateTeamTournamentInput,
  ) {
    return this.teamsTournamentsService.create(createTeamTournamentInput);
  }

  @Mutation(() => TeamTournament, { name: 'updateTeamTournament' })
  async update(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateTeamTournamentInput')
    updateTeamTournamentInput: UpdateTeamTournamentInput,
  ) {
    return this.teamsTournamentsService.update(id, updateTeamTournamentInput);
  }

  @Mutation(() => TeamTournament, { name: 'removeTeamTournament' })
  async remove(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.teamsTournamentsService.remove(id);
  }
}
