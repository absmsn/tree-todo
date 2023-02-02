import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateTagDto from './dto/create-tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async addOne(tag: CreateTagDto) {
    const newTag = this.tagsRepository.create(tag);
    await this.tagsRepository.insert(newTag);
    return newTag;
  }

  async removeOne(id: number) {
    await this.tagsRepository.delete(id);
  }

  async edit(id: number, content: any) {
    await this.tagsRepository.update(id, content);
  }
}
