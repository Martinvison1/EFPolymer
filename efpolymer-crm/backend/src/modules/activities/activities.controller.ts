import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from './Activities.service';

@ApiTags('Activities')
@Controller('Activities')
export class ActivitiesController {
  constructor(private readonly ActivitiesService: ActivitiesService) {}

  // TODO: Implement controller methods
}
