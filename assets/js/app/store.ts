import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import snapshotReducer from "../features/snapshot/snapshotSlice";
import moveTargetReducer from '../features/move/moveTargetSlice';
export const store = configureStore({
  reducer: {
    snapshot: snapshotReducer,
    moveTarget:moveTargetReducer

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
