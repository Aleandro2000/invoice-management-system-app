import { Decimal } from '@prisma/client/runtime/library';

export interface BillInterface {
  id: number;
  amount: Decimal;
  due_date: Date;
  details: string;
  user_id: number;
}
