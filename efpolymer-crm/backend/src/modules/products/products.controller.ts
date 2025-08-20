import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './Products.service';

@ApiTags('Products')
@Controller('Products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  // TODO: Implement controller methods
}
