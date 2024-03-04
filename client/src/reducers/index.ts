import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { invoiceReducer } from "./invoice.reducer";
import { billReducer } from "./bill.reducer";

export const allReducers = combineReducers({
    userReducer,
    billReducer,
    invoiceReducer,
});
