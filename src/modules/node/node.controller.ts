import { 
  Body,
  Post,
  Controller,
  Delete,
  Put,
  Param,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
  Get,
  NotFoundException,
  Header,
  Res
} from '@nestjs/common';
import { NodeTagService } from '../node-tag/node-tag.service';
import CreateNodeDto from './dto/create-node.dto';
import { NodeService } from './node.service';
import EditNodeDto from './dto/edit-node.dto';
import RemoveBatchDto from './dto/remove-batch.dto';
import { ConditionService } from '../condition/condition.service';
import CreateConditionDto from '../condition/dto/create-condition.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { 
  createNodeAttachmentDir,
  deleteNodeAttachmentDir,
  getNodeBackgroundImagePath,
  readNodeAttachment,
  removeNodeBackgroundImage,
  writeNodeAttachment
} from 'src/utils/file';
import { Response } from 'express';
import { createReadStream, createWriteStream } from 'fs';

type EditNodeBatchDto = {
  ids: number[];
  contents: EditNodeDto[];
};

@Controller('/api')
export class NodeController {
  constructor(
    private readonly nodesService: NodeService,
    private readonly nodeTagService: NodeTagService,
    private readonly conditionService: ConditionService
  ) {}
  @Post("/node")
  async addOne(@Body() body: CreateNodeDto) {
    const node = await this.nodesService.addOne(body);
    const result = await this.nodesService.getUserAndMapOfNode(node.id);
    if (result) {
      await createNodeAttachmentDir(result.userId, result.mapId, node.id);
      return {
        id: node.id
      };
    }
  }

  @Put("/node/:nodeId")
  async edit(@Param("nodeId") id: number, @Body() body: EditNodeDto) {
    await this.nodesService.edit(id, body);
  }

  @Put("/nodes")
  async editBatch(@Body() body: EditNodeBatchDto) {
    if (body.ids.length !== body.contents.length) {
      throw new BadRequestException();
    }
    await this.nodesService.editBatch(body.ids, body.contents);
  }

  @Delete("/node/:nodeId/tag/:tagId")
  async removeTag(@Param() params: any) {
    await this.nodeTagService.removeOne(params.nodeId, params.tagId);
  }

  @Post("/node/:nodeId/tags")
  async addTags(@Param("nodeId") nodeId: number, @Body() body: any) {
    await this.nodeTagService.add(nodeId, body.tagIds);
  }

  @Delete("/node/:nodeId/tags")
  async removeTags(@Param("nodeId") nodeId: number, @Body() body: any) {
    await this.nodeTagService.remove(nodeId, body.tagIds);
  }

  @Post("/node/:nodeId/condition")
  async addCondition(@Param("nodeId") nodeId: number, @Body() body: CreateConditionDto) {
    await this.conditionService.addOne(nodeId, body.targetId, body.text);
  }

  @Post("/node/:nodeId/background")
  @UseInterceptors(FileInterceptor("file"))
  async setBackground(@Param("nodeId") nodeId: number, @UploadedFile() file: Express.Multer.File) {
    const result = await this.nodesService.getUserAndMapOfNode(nodeId);
    await this.nodesService.edit(nodeId, {
      backgroundImageFileName: file.originalname
    });
    await writeNodeAttachment(result.userId, result.mapId, nodeId, file.originalname, file.buffer);
  }

  @Get("/node/:nodeId/background")
  @Header("Content-Type", "image/png")
  async getBackground(@Param("nodeId") nodeId: number, @Res() res: Response) {
    const result = await this.nodesService.getUserAndMapOfNode(nodeId);
    const node = await this.nodesService.findOneById(nodeId);
    if (node.backgroundImageFileName) {
      const filePath = getNodeBackgroundImagePath(result.userId, result.mapId, nodeId, node.backgroundImageFileName);
      const cs = createReadStream(filePath);
      cs.on("data", chunk => {
        res.write(chunk);
      })
      cs.on("end", () => {
        res.status(200);
        res.end();
      })
    } else {
      throw new NotFoundException();
    }
  }

  @Delete("/node/:nodeId/background")
  async removeBackground(@Param("nodeId") nodeId: number) {
    const result = await this.nodesService.getUserAndMapOfNode(nodeId);
    const node = await this.nodesService.findOneById(nodeId);
    if (node.backgroundImageFileName) {
      await removeNodeBackgroundImage(result.userId, result.mapId, nodeId, node.backgroundImageFileName);
      await this.nodesService.edit(node.id, {
        backgroundImageFileName: null
      });
    } else {
      throw new NotFoundException();
    }
  }

  @Delete("/node")
  removeOne() {
    
  }

  @Delete("/nodes")
  async remove(@Body() body: RemoveBatchDto) {
    if (body.ids && Array.isArray(body.ids)) {
      for (let i = 0; i < body.ids.length; i++) {
        const result = await this.nodesService.getUserAndMapOfNode(body.ids[i]);
        if (result) {
          await deleteNodeAttachmentDir(result[0], result[1], body.ids[i]);
        }
      }
      await this.nodesService.remove(body.ids);
    }
  }
}
