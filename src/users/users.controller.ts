import { Body, Controller, Get, HttpCode, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseInterface } from './types/user-response.interface';
import { LoginUserDto } from './dto/login.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { BackendValidationPipe } from '../shared/pipes/backend-validation.pipe';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  @UsePipes(new BackendValidationPipe())
  public async create(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    const user = await this.usersService.createUser(createUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new BackendValidationPipe())
  @HttpCode(200)
  public async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
    const user = await this.usersService.signin(loginUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  public async getCurrentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.usersService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  public async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.usersService.updateUserById(currentUserId, updateUserDto);
    return this.usersService.buildUserResponse(user);
  }
}
