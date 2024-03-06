import { IsDate, IsNotEmpty } from 'class-validator';

export class InvoiceDto {
  readonly id: number;

  @IsNotEmpty()
  readonly amount: number;

  @IsNotEmpty()
  readonly details: string;

  @IsDate()
  readonly due_date: Date;
}
