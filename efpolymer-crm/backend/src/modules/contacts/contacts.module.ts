import { Module } from '@nestjs/common';
import { ContactsService } from './Contacts.service';
import { ContactsController } from './Contacts.controller';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ContactsService],
})
export class ContactsModule {}
