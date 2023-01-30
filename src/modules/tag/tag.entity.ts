import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Index
} from 'typeorm';
import { Map } from '../map/map.entity';
import { Node } from '../node/node.entity';
import { NodeTag } from '../node-tag/node-tag.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  name: string;

  @Column()
  mapId: number;

  @ManyToOne(() => Map, (map) => map.tags, {
    onDelete: "CASCADE"
  })
  map: Map

  @OneToMany(() => Node, (node) => node.tags)
  nodes: Node[]

  @OneToMany(() => NodeTag, (nodeTag) => nodeTag.tag)
  nodeTags: NodeTag[]
}