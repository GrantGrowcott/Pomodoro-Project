import { createSlice } from "@reduxjs/toolkit";

// This state is a control value to give the TorusGeometry 'phases'
// Each phase correlates to each completed Pomodoro
interface TorusArcState {
  value: number;
}

const initialState: TorusArcState = {
  value: 1,
};

export const torusArcSlice = createSlice({
  name: "torusArc",
  initialState,
  reducers: {
    arcIncrement: (state) => {
      state.value += 1;
    },
    arcReset: (state) => {
      state.value = 1;
    },
  },
});

export const { arcIncrement, arcReset } = torusArcSlice.actions;

export default torusArcSlice.reducer;
