import { 
  Body,
  Post,
  Controller,
  Delete,
  Put
} from '@nestjs/common';
import { NodeTagService } from './node-tag.service';
import CreateNodeTagDto from './dto/create-node-tag.dto';

@Controller('/api/node-tag')
export class NodeTagController {
  constructor(
    private readonly nodeTagsService: NodeTagService
  ) {}
  @Post()
  async addOne(@Body() body: CreateNodeTagDto) {
    const nodeTag = await this.nodeTagsService.addOne(body);
    return {
      id: nodeTag.id
    };
  }

  @Put()
  async edit() {
    
  }

  @Delete()
  removeOne(nodeId: number, tagId: number) {

  }
}
