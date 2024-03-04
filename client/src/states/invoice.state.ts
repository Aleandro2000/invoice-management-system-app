import { InvoiceInterface } from "../interfaces/invoice.interface"

interface InitialInvoiceInterface {
    invoice: InvoiceInterface | undefined
}

export const initialInvoice: InitialInvoiceInterface = {
    invoice: undefined,
}