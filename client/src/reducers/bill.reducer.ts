import initialState from "../states";
import { ActionReducer } from "../interfaces/action-reducer.interface";

export const billReducer = (state = initialState.initialBill, action: ActionReducer) => {
  switch (action.type) {
    case "BILL_FULFILL":
      return action?.payload;
    case "BILL_EMPTY":
      return initialState.initialUser;
    default:
      return state;
  }
};
