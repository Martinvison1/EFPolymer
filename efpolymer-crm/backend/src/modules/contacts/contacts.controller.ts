import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactsService } from './Contacts.service';

@ApiTags('Contacts')
@Controller('Contacts')
export class ContactsController {
  constructor(private readonly ContactsService: ContactsService) {}

  // TODO: Implement controller methods
}
