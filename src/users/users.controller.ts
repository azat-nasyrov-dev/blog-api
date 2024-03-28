import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  public async create(@Body('user') createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.createUser(createUserDto);
  }
}
