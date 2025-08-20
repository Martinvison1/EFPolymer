import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuotesService } from './Quotes.service';

@ApiTags('Quotes')
@Controller('Quotes')
export class QuotesController {
  constructor(private readonly QuotesService: QuotesService) {}

  // TODO: Implement controller methods
}
