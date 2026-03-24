import { Controller, Get, Param, Query} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  test(): string[] {
    return this.userService.test();
  }

  @Get()
  async findAll(): Promise<IUser[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('fields') fields?: string): Promise<Partial<IUser>>{
  const fieldArray = fields ? fields.split(',') : undefined;
    return await this.userService.findOne(id, fieldArray);
  }
}
