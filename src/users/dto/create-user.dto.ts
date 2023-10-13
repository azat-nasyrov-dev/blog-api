import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'Username' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'john@gmail.com', description: 'Email' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123', description: 'User password' })
  @IsNotEmpty()
  readonly password: string;
}
