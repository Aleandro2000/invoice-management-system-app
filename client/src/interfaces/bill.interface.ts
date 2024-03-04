export interface BillInterface {
  id: number;
  amount: number;
  due_date: Date;
  details: string;
  user_id: number;
}
