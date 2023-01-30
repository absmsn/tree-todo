import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { Node } from '../node/node.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class NodeTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nodeId: number;

  @Column()
  tagId: number;

  @ManyToOne(() => Node, (node) => node.tags, {
    onDelete: "CASCADE"
  })
  node: Node

  @ManyToOne(() => Tag, (tag) => tag.nodeTags, {
    onDelete: "CASCADE"
  })
  tag: Tag
}