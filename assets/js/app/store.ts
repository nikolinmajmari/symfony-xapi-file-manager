import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import snapshotReducer from "../features/snapshot/snapshotSlice";

export const store = configureStore({
  reducer: {
    snapshot: snapshotReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
