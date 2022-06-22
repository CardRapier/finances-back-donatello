import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateActionDto {
  @IsDateString()
  date: Date;

  @IsNumber()
  amount: number;

  @IsBoolean()
  isExpense: boolean;

  @IsString()
  description: string;

  @IsNumber()
  categoryId: number;
}
