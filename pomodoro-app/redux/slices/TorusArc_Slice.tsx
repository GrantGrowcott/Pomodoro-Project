import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TorusArcState {
  index: number;
  angle: number;
}

const initialState: TorusArcState = {
  index: 0,
  angle: 0,
};

export const torusArcSlice = createSlice({
  name: "torusArc",
  initialState,
  reducers: {
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
      state.angle = action.payload;
    },
    arcIncrement: (state) => {
      state.angle = state.angle + state.index;
    },
    arcSkip: (state) => {
      state.angle = Math.PI * 2;
    },
    arcReset: (state) => {
      state.angle = state.index;
    },
  },
});

export const { setIndex, arcReset, arcIncrement, arcSkip } =
  torusArcSlice.actions;

export default torusArcSlice.reducer;
