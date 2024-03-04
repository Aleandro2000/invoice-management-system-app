import { BillInterface } from "../interfaces/bill.interface"

interface InitialBillInterface {
    bill: BillInterface | undefined
}

export const initialBill: InitialBillInterface = {
    bill: undefined,
}