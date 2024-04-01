import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'john@gmail.com', description: 'Email' })
  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({ example: 'John', description: 'Username' })
  @IsOptional()
  @IsString()
  readonly username?: string;

  @ApiProperty({ example: 'user biography', description: 'Biography' })
  @IsOptional()
  @IsString()
  readonly bio?: string;

  @ApiProperty({ example: 'image', description: 'User photo' })
  @IsOptional()
  @IsString()
  readonly image?: string;
}
