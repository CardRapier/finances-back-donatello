import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from './../../categories/entities/category.entity';
import { Debt } from './../../debts/entities/debt.entity';
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

  @ManyToMany(() => Debt, (debt) => debt.actions)
  debts: Debt[];
}
