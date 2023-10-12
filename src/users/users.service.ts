import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.config';
import { UserResponseInterface } from './types/user-response.interface';
import { HAS_ALREADY_BEEN_TAKEN_ERROR } from './users.constants';
import { LoginUserDto } from './dto/login-user.dto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const errorResponse = {
      errors: {},
    };
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (userByEmail) {
      errorResponse.errors['email'] = HAS_ALREADY_BEEN_TAKEN_ERROR;
    }

    if (userByUsername) {
      errorResponse.errors['username'] = HAS_ALREADY_BEEN_TAKEN_ERROR;
    }

    if (userByEmail || userByUsername) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    return await this.userRepository.save(newUser);
  }

  public async signin(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const errorResponse = {
      errors: {
        'email or password': 'is invalid',
      },
    };
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'username', 'email', 'bio', 'image', 'password'],
    });

    if (!user) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    delete user.password;

    return user;
  }

  public findUserById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  public async updateUserById(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);
    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  public generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  public buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
