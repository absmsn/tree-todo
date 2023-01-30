import { 
  PrimaryGeneratedColumn,
  Entity,
  Column,
  Index,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Condition } from '../condition/condition.entity';
import { Map } from '../map/map.entity';
import { NodeTag } from '../node-tag/node-tag.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class Node {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  title: string;

  @Column({nullable: true})
  startTime: Date;

  @Column({nullable: true})
  endTime: Date;

  @Column({nullable: true})
  createTime: Date

  @Column({nullable: true})
  finishedTime: Date

  @Column()
  finished: Boolean

  @Column()
  comment: string;

  @Column()
  priority: number;

  @Column({nullable: true})
  backgroundImageFileName: string;

  @Column({nullable: true})
  parentId: number;

  @Column()
  mapId: number;

  @ManyToOne(() => Map, (map) => map.nodes, {
    onDelete: "CASCADE"
  })
  map: Map

  @OneToMany(() => NodeTag, (nodeTag) => nodeTag.node)
  tags: Tag[]

  @OneToMany(() => Condition, (condition) => condition.source)
  outs: Condition[]

  @OneToMany(() => Condition, (condition) => condition.target)
  ins: Condition[]
}