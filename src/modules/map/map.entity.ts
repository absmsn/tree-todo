import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Node } from '../node/node.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';

@Entity()
export class Map {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true
  })
  createTime: Date

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.maps, {
    onDelete: "CASCADE"
  })
  user: User

  @OneToMany(() => Node, (node) => node.map)
  nodes: Node[]

  @OneToMany(() => Tag, (tag) => tag.map)
  tags: Tag[]
}