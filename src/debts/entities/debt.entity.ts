import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Action } from './../../actions/entities/action.entity';
import { User } from './../../auth/entities/user.entity';

@Entity()
export class Debt {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column()
  creditor: string;

  @Column()
  debtor: string;

  @Column()
  description: string;

  @ManyToMany(() => Action, (action) => action.debts, { cascade: true })
  @JoinTable()
  actions: Action[];

  @ManyToOne(() => User, (user) => user.debts)
  user: User;
}
