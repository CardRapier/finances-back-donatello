import { IsNumber, IsString } from 'class-validator';

export class CreateDebtDto {
  @IsString()
  name: string;

  @IsNumber()
  value: number;

  @IsString()
  creditor: string;

  @IsString()
  debtor: string;

  @IsString()
  description: string;
}
