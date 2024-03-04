import initialState from "../states";
import { ActionReducer } from "../interfaces/action-reducer.interface";

export const invoiceReducer = (state = initialState.initialInvoice, action: ActionReducer) => {
  switch (action.type) {
    case "INVOICE_FULFILL":
      return action?.payload;
    case "INVOICE_EMPTY":
      return initialState.initialInvoice;
    default:
      return state;
  }
};
