import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John', description: 'Username' })
  readonly username: string;

  @ApiProperty({ example: 'john@gmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: '123', description: 'User password' })
  readonly password: string;

  @ApiProperty({ example: 'user biography', description: 'Biography' })
  readonly bio: string;

  @ApiProperty({ example: 'image', description: 'User photo' })
  readonly image: string;
}
