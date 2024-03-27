import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  public async findAll(): Promise<{ tags: string[] }> {
    const tags = await this.tagsService.findListOfTags();
    return {
      tags: tags.map((tag) => tag.name),
    };
  }
}
