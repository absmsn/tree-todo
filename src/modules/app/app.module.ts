import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { Map } from '../map/map.entity';
import { NodeModule } from '../node/node.module';
import { MapModule } from '../map/map.module';
import { Node } from '../node/node.entity';
import { Tag } from '../tag/tag.entity';
import { TagModule } from '../tag/tag.module';
import { Condition } from '../condition/condition.entity';
import { ConditionModule } from '../condition/condition.module';
import { NodeTagModule } from '../node-tag/node-tag.module';
import { NodeTag } from '../node-tag/node-tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tree-todo',
      password: 'bkGQ4P^B2sjkPqzu',
      database: 'tree-todo',
      entities: [User, Map, Node, Tag, Condition, NodeTag],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    MapModule,
    NodeModule,
    TagModule,
    ConditionModule,
    NodeTagModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
