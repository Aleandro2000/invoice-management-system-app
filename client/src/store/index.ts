import {
  type ThunkMiddleware,
  type Tuple,
  type UnknownAction,
  configureStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { allReducers } from "../reducers";

const middleware = [thunk];

const store = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware) as Tuple<
      [ThunkMiddleware<object, UnknownAction>]
    >,
  devTools: import.meta.env.APP_MODE !== "production",
});

export default store;
