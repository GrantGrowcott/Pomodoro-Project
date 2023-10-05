import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

// Target Counter
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
  },
});

export const { arcIncrement } = torusArcSlice.actions;

export default torusArcSlice.reducer;

// Target Counter
