import {
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Controller,
  NotFoundException
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { NodeService } from '../node/node.service';
import { MapService } from './map.service';
import CreateMapDto from './dto/create-map.dto';
import EditMapDto from './dto/edit-map.dto';
import { createMapAttachmentDir, deleteMapAttachmentDir, getNodeBackgroundURLPath } from 'src/utils/file';
import { BASE_URL } from 'src/constants';

@Controller('/api/map')
export class MapController {
  constructor(
    private readonly mapService: MapService,
    private readonly nodeService: NodeService
  ) {}

  @Post()
  async addOne(@Body() body: CreateMapDto) {
    body = plainToClass(CreateMapDto, body);
    const map = await this.mapService.addOne(body);
    await createMapAttachmentDir(body.userId, map.id);
    return {
      id: map.id
    };
  }

  @Get("/:mapId")
  async getOne(@Param("mapId") mapId: number) {
    const map = this.mapService.findOne({
      where: {id: mapId},
      relations: ["tags"]
    });
    if (map) {
      return map;
    } else {
      throw new NotFoundException();
    }
  }

  @Put("/:mapId")
  async edit(@Param("mapId") mapId: number, @Body() content: EditMapDto) {
    if (await this.mapService.exist(mapId)) {
      this.mapService.edit(mapId, content);
    } else {
      throw new NotFoundException();
    }
  }

  @Delete("/:mapId")
  async removeOne(@Param("mapId") mapId: number) {
    if (await this.mapService.exist(mapId)) {
      const map = await this.mapService.findOneById(mapId);
      await this.mapService.deleteOne(mapId);
      await deleteMapAttachmentDir(map.userId, mapId);
    }
  }

  @Get("/:mapId/nodes")
  async getNodes(@Param() params: any) {
    const map = await this.mapService.findOne({
      where: { id: params.mapId }
    });
    if (map) {
      const nodes: any = await this.nodeService.find({
        where: {mapId: params.mapId},
        relations: ["tags", "outs"]
      });
      nodes.forEach((node: any) => {
        if (node.backgroundImageFileName !== null) {
          const url = BASE_URL + "/api" + getNodeBackgroundURLPath(node.id);
          node.backgroundImageURL = url;
        }
      });
      return nodes;
    } else {
      throw new NotFoundException();
    }
  }

  @Get("/:mapId/tags")
  async getTags(@Param() params: any) {
    const map = await this.mapService.findOne({
      where: { id: params.mapId },
      relations: { tags: true }
    });
    if (map) {
      return map.tags;
    } else {
      throw new NotFoundException();
    }
  }
}
