import { Module } from '@nestjs/common';
import { TrialsService } from './Trials.service';
import { TrialsController } from './Trials.controller';

@Module({
  controllers: [TrialsController],
  providers: [TrialsService],
  exports: [TrialsService],
})
export class TrialsModule {}
