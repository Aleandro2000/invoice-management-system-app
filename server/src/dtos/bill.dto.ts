import { IsDate, IsNotEmpty } from 'class-validator';

export class BillDto {
  readonly id: number;

  @IsNotEmpty()
  readonly amount: number;

  @IsNotEmpty()
  readonly details: string;

  @IsDate()
  readonly due_date: Date;
}
