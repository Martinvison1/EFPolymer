import { Module } from '@nestjs/common';
import { OpportunitiesService } from './Opportunities.service';
import { OpportunitiesController } from './Opportunities.controller';

@Module({
  controllers: [OpportunitiesController],
  providers: [OpportunitiesService],
  exports: [OpportunitiesService],
})
export class OpportunitiesModule {}
