import { configureStore } from "@reduxjs/toolkit";
import torusArcSlice from "./slices/TorusArc_Slice";
import taskSlice from './slices/grant_Slice'

export const store = configureStore({
  reducer: { 
    torusArc: torusArcSlice,
    task: taskSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
