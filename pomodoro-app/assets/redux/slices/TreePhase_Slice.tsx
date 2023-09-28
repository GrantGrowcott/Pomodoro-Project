import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

// Target Counter
interface TreePhaseState {
  value: number;
}

const initialState: TreePhaseState = {
  value: 1,
};

export const treePhaseSlice = createSlice({
  name: "treePhase",
  initialState,
  reducers: {
    phaseIncrement: (state) => {
      state.value += 1;
    },
  },
});

export const { phaseIncrement } = treePhaseSlice.actions;

/* export const selectCount = (state: RootState) => state.treePhase.value; */

export default treePhaseSlice.reducer;

// Target Counter
