import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeController } from './node.controller';
import { NodeService } from './node.service';
import { NodeTagModule } from '../node-tag/node-tag.module';
import { ConditionModule } from '../condition/condition.module';
import { Node } from './node.entity';
import { Map } from '../map/map.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Node, Map]), NodeTagModule, ConditionModule],
  providers: [NodeService],
  controllers: [NodeController],
  exports: [NodeService]
})
export class NodeModule {}
