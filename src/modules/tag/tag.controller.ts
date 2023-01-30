import { 
  Body,
  Post,
  Controller,
  Get,
  Delete,
  Param
} from '@nestjs/common';
import CreateTagDto from './dto/create-tag.dto';
import { TagService } from './tag.service';

@Controller('/api/tag')
export class TagController {
  constructor(
    private readonly tagsService: TagService
  ) {}

  @Post()
  async addOne(@Body() body: CreateTagDto) {
    const tag = await this.tagsService.addOne(body);
    return {
      id: tag.id
    };
  }

  @Delete("/:tagId")
  async removeOne(@Param("tagId") tagId: number) {
    await this.tagsService.removeOne(tagId);
  }
}
