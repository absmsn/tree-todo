import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeTagController } from './node-tag.controller';
import { NodeTagService } from './node-tag.service';
import { NodeTag } from './node-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NodeTag])],
  providers: [NodeTagService],
  controllers: [NodeTagController],
  exports: [NodeTagService]
})
export class NodeTagModule {}
