import { Module } from '@nestjs/common';
import { LeadsService } from './Leads.service';
import { LeadsController } from './Leads.controller';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
