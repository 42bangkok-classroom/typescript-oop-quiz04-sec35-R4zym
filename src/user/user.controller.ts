import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  test(): string[] {
    return this.userService.test();
  }

  @Get('users')
  findAll(): IUser[] {
    return this.userService.findAll();
  }
}
