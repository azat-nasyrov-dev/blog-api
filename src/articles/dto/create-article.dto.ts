import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ example: 'title', description: 'Title' })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ example: 'description', description: 'Description' })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ example: 'body', description: 'Body' })
  @IsNotEmpty()
  readonly body: string;

  @ApiProperty({ example: 'tags', description: 'List of tags' })
  @IsOptional()
  readonly tagList?: string[];
}
