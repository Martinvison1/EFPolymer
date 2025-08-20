import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OpportunitiesService } from './Opportunities.service';

@ApiTags('Opportunities')
@Controller('Opportunities')
export class OpportunitiesController {
  constructor(private readonly OpportunitiesService: OpportunitiesService) {}

  // TODO: Implement controller methods
}
