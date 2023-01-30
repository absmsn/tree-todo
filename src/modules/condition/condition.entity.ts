import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Node } from '../node/node.entity';

@Entity()
export class Condition {
  @PrimaryColumn()
  sourceId: number;

  @PrimaryColumn()
  targetId: number;

  @Column()
  text: string;

  @ManyToOne(() => Node, (node) => node.outs, {
    onDelete: "CASCADE"
  })
  @JoinColumn({name: "sourceId"})
  source: Node

  @ManyToOne(() => Node, (node) => node.ins, {
    onDelete: "CASCADE"
  })
  @JoinColumn({name: "targetId"})
  target: Node
}