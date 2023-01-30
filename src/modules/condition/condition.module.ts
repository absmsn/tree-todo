import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConditionController } from './condition.controller';
import { ConditionService } from './condition.service';
import { Condition } from './condition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Condition])],
  providers: [ConditionService],
  controllers: [ConditionController],
  exports: [ConditionService]
})
export class ConditionModule {}
