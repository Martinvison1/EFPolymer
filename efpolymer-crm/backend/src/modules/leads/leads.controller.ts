import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LeadsService } from './Leads.service';

@ApiTags('Leads')
@Controller('Leads')
export class LeadsController {
  constructor(private readonly LeadsService: LeadsService) {}

  // TODO: Implement controller methods
}
