import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ example: 'title', description: 'Title' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'description', description: 'Description' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 'body', description: 'Body' })
  @IsNotEmpty()
  @IsString()
  readonly body: string;

  @ApiProperty({ example: 'tags', description: 'List of tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tagList?: string[];
}
