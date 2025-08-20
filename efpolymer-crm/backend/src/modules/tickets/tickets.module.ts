import { Module } from '@nestjs/common';
import { TicketsService } from './Tickets.service';
import { TicketsController } from './Tickets.controller';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
