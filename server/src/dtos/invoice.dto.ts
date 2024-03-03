import { IsDate, IsNotEmpty } from 'class-validator';

export class InvoiceDto {
  @IsNotEmpty()
  readonly amount: number;

  @IsNotEmpty()
  readonly details: string;

  @IsDate()
  readonly due_date: Date;
}
