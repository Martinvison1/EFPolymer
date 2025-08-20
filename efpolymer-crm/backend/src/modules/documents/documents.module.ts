import { Module } from '@nestjs/common';
import { DocumentsService } from './Documents.service';
import { DocumentsController } from './Documents.controller';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
