import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Condition } from './condition.entity';
import EditConditionDto from './dto/edit-condition.dto';

@Injectable()
export class ConditionService {
  constructor(
    @InjectRepository(Condition)
    private conditionsRepository: Repository<Condition>,
  ) {}

  async addOne(sourceId: number, targetId: number, text: string) {
    const condition = this.conditionsRepository.create();
    condition.sourceId = sourceId;
    condition.targetId = targetId;
    condition.text = text;
    await this.conditionsRepository.insert(condition);
  }

  async edit(sourceId: number, targetId: number, body: EditConditionDto) {
    await this.conditionsRepository.update({
      sourceId,
      targetId
    }, body);
  }

  async remove(sourceId: number, targetId: number) {
    await this.conditionsRepository.delete({
      sourceId,
      targetId
    });
  }
}
