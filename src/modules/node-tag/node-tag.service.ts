import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NodeTag } from './node-tag.entity';
import CreateNodeTagDto from './dto/create-node-tag.dto';

@Injectable()
export class NodeTagService {
  constructor(
    @InjectRepository(NodeTag)
    private nodeTagsRepository: Repository<NodeTag>,
  ) {}

  async add(nodeId: number, tagIds: number[]) {
    const nodeTags = [];
    for (let i = 0; i < tagIds.length; i++) {
      const nodeTag = this.nodeTagsRepository.create({
        nodeId,
        tagId: tagIds[i]
      });
      nodeTags.push(nodeTag);
    }
    await this.nodeTagsRepository.insert(nodeTags);
  }

  async remove(nodeId: number, tagIds: number[]) {
    await this.nodeTagsRepository.delete({
      nodeId,
      tagId: In(tagIds)
    });
  }

  async addOne(nodeTag: CreateNodeTagDto) {
    const newNodeTag = this.nodeTagsRepository.create(nodeTag);
    this.nodeTagsRepository.insert(newNodeTag);
    return newNodeTag;
  }

  async removeOne(nodeId: number, tagId: number) {
    await this.nodeTagsRepository.delete({
      nodeId,
      tagId
    });
  }
}
