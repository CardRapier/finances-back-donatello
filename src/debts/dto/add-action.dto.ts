import { IsNumber } from 'class-validator';

export class AddActionDto {
  @IsNumber()
  debtId: number;

  @IsNumber()
  actionId: number;
}
