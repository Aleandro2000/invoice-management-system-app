import { Decimal } from '@prisma/client/runtime/library';

export interface InvoiceInterface {
  id: number;
  amount: Decimal;
  due_date: Date;
  details: string;
  user_id: number;
}
