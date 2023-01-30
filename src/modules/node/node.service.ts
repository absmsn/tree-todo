import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import CreateNodeDto from './dto/create-node.dto';
import EditNodeDto from './dto/edit-node.dto';
import { Map } from '../map/map.entity';
import { Node } from './node.entity';

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(Node)
    private nodesRepository: Repository<Node>,
    @InjectRepository(Map)
    private mapsRepository: Repository<Map>
  ) {}

  async addOne(node: CreateNodeDto) {
    const newNode = this.nodesRepository.create(node);
    newNode.createTime = new Date();
    await this.nodesRepository.insert(newNode);
    return newNode;
  }

  async find(query: FindManyOptions<Node>) {
    return await this.nodesRepository.find(query);
  }

  async findOneById(id: number) {
    return await this.nodesRepository.findOneBy({id});
  }

  async findManyByIds(ids: number[]) {
    return await this.nodesRepository.findBy({
      id: In(ids)
    });
  }

  async edit(id: number, content: Partial<EditNodeDto>) {
    this.nodesRepository.update(id, content);
  }

  async editBatch(ids: number[], contents: EditNodeDto[]) {
    for (let i = 0; i < ids.length; i++) {
      await this.nodesRepository.update(ids[i], contents[i]);
    }
  }

  async removeOne(nodeId: number) {
    await this.nodesRepository.delete(nodeId);
  }

  async remove(ids: number[]) {
    await this.nodesRepository.delete({
      id: In(ids)
    });
  }

  // 获取节点对应的mapId和userId
  async getUserAndMapOfNode(nodeId: number) {
    const node = await this.nodesRepository.findOne({
      where: {id: nodeId},
      select: ["mapId"]
    });
    if (node) {
      const map = await this.mapsRepository.findOne({
        where: {id: node.mapId},
        select: ["userId"]
      });
      return {
        userId: map.userId,
        mapId: node.mapId
      };
    }
  }
}
