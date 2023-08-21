import { Module } from '@nestjs/common';
import { DraftsResolver } from './drafts.resolver';
import { DraftsService } from './drafts.service';
import { DraftByNation } from './entities/draft-by-nation.entity';
import { DraftByTeam } from './entities/draft-by-team.entity';
import { DraftDetail } from './entities/draft-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([DraftByNation, DraftByTeam, DraftDetail]),
  ],
  providers: [DraftsResolver, DraftsService],
})
export class DraftsModule {}
