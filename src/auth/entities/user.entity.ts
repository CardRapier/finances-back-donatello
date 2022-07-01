import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Action } from './../../actions/entities/action.entity';
import { Debt } from './../../debts/entities/debt.entity';

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

  @Column({ select: false })
  password: string;

  @OneToMany(() => Action, (action) => action.category)
  actions: Action[];

  @OneToMany(() => Debt, (action) => action.user)
  debts: Debt[];
}
