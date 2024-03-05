import {
  type ThunkMiddleware,
  type Tuple,
  type UnknownAction,
  configureStore,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { allReducers } from "../reducers";

const middleware = [thunk];

export default configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware) as Tuple<
      [ThunkMiddleware<object, UnknownAction>]
    >,
  devTools: import.meta.env.VITE_APP_MODE !== "production",
});
