import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Action } from './../../actions/entities/action.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column({ unique: true })
  @Index()
  name: string;

  @Column()
  icon: string;

  @Column({ default: true })
  isExpense: boolean;

  @OneToMany(() => Action, (action) => action.category)
  actions: Action[];
}
