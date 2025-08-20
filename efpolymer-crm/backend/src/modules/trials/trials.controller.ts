import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrialsService } from './Trials.service';

@ApiTags('Trials')
@Controller('Trials')
export class TrialsController {
  constructor(private readonly TrialsService: TrialsService) {}

  // TODO: Implement controller methods
}
