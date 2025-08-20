import { Module } from '@nestjs/common';
import { ActivitiesService } from './Activities.service';
import { ActivitiesController } from './Activities.controller';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
