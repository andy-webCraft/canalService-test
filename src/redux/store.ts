import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appReducer from "./slices/app.slice";
import usersReducer from "./slices/users.slice";

export const store = configureStore({
  reducer: { appReducer: appReducer, usersReducer: usersReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
