import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';

export class Category {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column({ default: true })
  isExpense: boolean;
}
