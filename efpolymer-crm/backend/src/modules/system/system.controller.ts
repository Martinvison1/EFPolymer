import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemService } from './System.service';

@ApiTags('System')
@Controller('System')
export class SystemController {
  constructor(private readonly SystemService: SystemService) {}

  // TODO: Implement controller methods
}
