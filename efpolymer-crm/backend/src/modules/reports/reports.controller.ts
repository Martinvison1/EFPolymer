import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReportsService } from './Reports.service';

@ApiTags('Reports')
@Controller('Reports')
export class ReportsController {
  constructor(private readonly ReportsService: ReportsService) {}

  // TODO: Implement controller methods
}
