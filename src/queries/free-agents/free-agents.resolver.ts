import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { FreeAgent } from './entities/free-agent.entity/free-agent.entity';
import { Repository } from 'typeorm';
import { FreeAgentsService } from './free-agents.service';
import { ParseIntPipe } from '@nestjs/common';

@Resolver()
export class FreeAgentsResolver {
  constructor(
    @InjectRepository(FreeAgent)
    private readonly freeAgent: Repository<FreeAgent>,
    private readonly freeAgentsService: FreeAgentsService,
  ) {}

  @Query(() => [FreeAgent], { name: 'freeAgents' })
  async freeAgents(
    @Args('seasonId', { type: () => ID }, ParseIntPipe) seasonId: number,
    @Args('nationId', { type: () => ID }, ParseIntPipe) nationId: number,
  ) {
    return this.freeAgentsService.freeAgents(seasonId, nationId);
  }
}
