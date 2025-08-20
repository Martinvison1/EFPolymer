import { Module } from '@nestjs/common';
import { ReportsService } from './Reports.service';
import { ReportsController } from './Reports.controller';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
