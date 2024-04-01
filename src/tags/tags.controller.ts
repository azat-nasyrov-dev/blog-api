import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({ status: 200, description: 'Return all tags' })
  @Get()
  public async findAll(): Promise<{ tags: string[] }> {
    const tags = await this.tagsService.findListOfTags();
    return {
      tags: tags.map((tag) => tag.name),
    };
  }
}
