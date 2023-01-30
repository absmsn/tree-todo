import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { Map } from '../map/map.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Map, (map) => map.user)
  maps: Map[]
}