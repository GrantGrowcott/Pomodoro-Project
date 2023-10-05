import { configureStore } from "@reduxjs/toolkit";
import torusArcSlice from "./slices/TorusArc_Slice";

export const store = configureStore({
  reducer: { torusArc: torusArcSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
