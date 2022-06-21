import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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
}
