import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseInterface } from './types/user-response.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './entities/user.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  public async create(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.usersService.createUser(createUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  public async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.usersService.signin(loginUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Get('user')
  public async currentUser(
    @User() user: UserEntity,
  ): Promise<UserResponseInterface> {
    return this.usersService.buildUserResponse(user);
  }
}
