import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TicketsService } from './Tickets.service';

@ApiTags('Tickets')
@Controller('Tickets')
export class TicketsController {
  constructor(private readonly TicketsService: TicketsService) {}

  // TODO: Implement controller methods
}
