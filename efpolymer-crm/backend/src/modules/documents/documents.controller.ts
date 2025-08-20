import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocumentsService } from './Documents.service';

@ApiTags('Documents')
@Controller('Documents')
export class DocumentsController {
  constructor(private readonly DocumentsService: DocumentsService) {}

  // TODO: Implement controller methods
}
