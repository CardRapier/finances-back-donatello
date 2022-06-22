import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from './../../categories/entities/category.entity';
import { User } from './../../auth/entities/user.entity';

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  date: Date;

  @Column()
  amount: number;

  @Column({ default: true })
  isExpense: boolean;

  @Column({ default: '' })
  description: string;

  @ManyToOne(() => Category, (category) => category.actions)
  category: Category;

  @ManyToOne(() => User, (user) => user.actions)
  user: User;
}
