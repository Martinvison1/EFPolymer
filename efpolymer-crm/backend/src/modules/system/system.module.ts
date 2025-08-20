import { Module } from '@nestjs/common';
import { SystemService } from './System.service';
import { SystemController } from './System.controller';

@Module({
  controllers: [SystemController],
  providers: [SystemService],
  exports: [SystemService],
})
export class SystemModule {}
