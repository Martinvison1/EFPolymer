import { Module } from '@nestjs/common';
import { QuotesService } from './Quotes.service';
import { QuotesController } from './Quotes.controller';

@Module({
  controllers: [QuotesController],
  providers: [QuotesService],
  exports: [QuotesService],
})
export class QuotesModule {}
