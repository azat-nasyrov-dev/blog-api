import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'john@gmail.com', description: 'Email' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '123', description: 'User password' })
  @IsNotEmpty()
  readonly password: string;
}
