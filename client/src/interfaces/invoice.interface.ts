export interface InvoiceInterface {
  id: number;
  amount: number;
  due_date: Date;
  details: string;
  user_id: number;
}
