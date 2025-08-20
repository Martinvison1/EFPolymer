import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './Users.service';

@ApiTags('Users')
@Controller('Users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  // TODO: Implement controller methods
}
