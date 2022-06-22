import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Action } from './../../actions/entities/action.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Action, (action) => action.category)
  actions: Action[];
}
