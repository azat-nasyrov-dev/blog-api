import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseInterface } from './types/user-response.interface';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  public async create(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    const user = await this.usersService.createUser(createUserDto);
    return this.usersService.buildUserResponse(user);
  }
}