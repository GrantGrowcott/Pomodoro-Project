import { configureStore } from "@reduxjs/toolkit";
import torusArcSlice from "./slices/TorusArc_Slice";
import taskSlice from "./slices/Notes_Slice";
import pomodoroSlice from "./slices/Pomodoro_Slice";
import sessionSlice from "./slices/Session_Slice";

export const store = configureStore({
  reducer: {
    torusArc: torusArcSlice,
    task: taskSlice,
    session: sessionSlice,
    pomodoro: pomodoroSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
