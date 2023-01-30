import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { NodeModule } from '../node/node.module';
import { Map } from './map.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Map]), NodeModule],
  providers: [MapService],
  controllers: [MapController],
  exports: [MapService]
})
export class MapModule {}
