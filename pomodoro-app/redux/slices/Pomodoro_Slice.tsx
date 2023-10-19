import { createSlice } from "@reduxjs/toolkit";

// Pomodoro = 1 work/focus session completed.
// This measures how many of them have been completed successfully
interface Pomodoro {
  completed: number;
}

const initialState: Pomodoro = {
  completed: 0,
};

export const pomodoroSlice = createSlice({
  name: "pomodoroSlice",
  initialState,
  reducers: {
    increaseCompleted: (state) => {
      state.completed += 1;
    },
  },
});

export const { increaseCompleted } = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
