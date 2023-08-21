import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { DraftByNation } from './entities/draft-by-nation.entity';
import { DraftByTeam } from './entities/draft-by-team.entity';
import { DraftDetail } from './entities/draft-detail.entity';
import { Repository } from 'typeorm';
import { DraftsService } from './drafts.service';

@Resolver()
export class DraftsResolver {
  constructor(
    @InjectRepository(DraftByNation)
    private draftByNation: Repository<DraftByNation>,
    @InjectRepository(DraftByTeam)
    private draftByTeam: Repository<DraftByTeam>,
    @InjectRepository(DraftDetail)
    private draftDetail: Repository<DraftDetail>,
    private readonly draftService: DraftsService,
  ) {}

  @Query(() => [DraftByNation], { name: 'draftByNations' })
  async draftByNations() {
    return this.draftService.draftByNations();
  }

  @Query(() => [DraftByTeam], { name: 'draftByTeams' })
  async draftByTeams() {
    return this.draftService.draftByTeams();
  }

  @Query(() => [DraftDetail], { name: 'draftDetails' })
  async draftDetails(
    @Args('teamId', { type: () => ID, nullable: true })
    teamId: number,
    @Args('nationId', { type: () => ID, nullable: true })
    nationId: number,
  ) {
    return this.draftService.draftDetails(teamId, nationId);
  }
}
