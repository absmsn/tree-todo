import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import CreateMapDto from './dto/create-map.dto';
import EditMapDto from './dto/edit-map.dto';
import { Map } from './map.entity';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(Map)
    private mapsRepository: Repository<Map>,
  ) {}

  async exist(mapId: number) {
    return this.mapsRepository.exist({
      where: {id: mapId}
    });
  }

  async find(query: FindManyOptions<Map>) {
    return await this.mapsRepository.find(query);
  }

  async findOne(query: FindOneOptions<Map>) {
    return await this.mapsRepository.findOne(query);
  }

  async findOneById(id: number) {
    return await this.mapsRepository.findOneBy({id});
  }

  async addOne(map: CreateMapDto) {
    const newMap = this.mapsRepository.create(map);
    newMap.createTime = new Date();
    await this.mapsRepository.insert(newMap);
    return newMap;
  }

  async edit(mapId: number, content: EditMapDto) {
    this.mapsRepository.update(mapId, content);
  }

  async deleteOne(mapId: number) {
    await this.mapsRepository.delete(mapId);
  }
}
