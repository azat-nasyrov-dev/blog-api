import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArticleDto {
  @ApiProperty({ example: 'title', description: 'Title' })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({ example: 'description', description: 'Description' })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ example: 'body', description: 'Body' })
  @IsOptional()
  @IsString()
  readonly body?: string;

  @ApiProperty({ example: 'tags', description: 'List of tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tagList?: string[];
}
