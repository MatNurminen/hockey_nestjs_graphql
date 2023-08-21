import { Module } from '@nestjs/common';
import { FreeAgentsService } from './free-agents.service';
import { FreeAgentsResolver } from './free-agents.resolver';
import { FreeAgent } from './entities/free-agent.entity/free-agent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FreeAgent])],
  providers: [FreeAgentsService, FreeAgentsResolver],
})
export class FreeAgentsModule {}
