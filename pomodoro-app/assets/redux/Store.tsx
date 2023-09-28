import { configureStore } from "@reduxjs/toolkit";
import treePhaseReducer from "./slices/TreePhase_Slice";

export const store = configureStore({
  reducer: { treePhase: treePhaseReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
