import initialState from "../states";
import { ActionReducer } from "../interfaces/action-reducer.interface";

export const userReducer = (state = initialState.initialUser, action: ActionReducer) => {
  switch (action.type) {
    case "USER_FULFILL":
      return action?.payload;
    case "USER_EMPTY":
      return initialState.initialUser;
    default:
      return state;
  }
};
