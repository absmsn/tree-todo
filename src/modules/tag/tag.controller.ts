import { 
  Body,
  Post,
  Controller,
  Delete,
  Param,
  Put
} from '@nestjs/common';
import CreateTagDto from './dto/create-tag.dto';
import EditTagDto from './dto/edit-tag.dto';
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

  @Put("/:tagId")
  async edit(@Param("tagId") tagId: number, @Body() content: EditTagDto) {
    await this.tagsService.edit(tagId, content);
  }
}
