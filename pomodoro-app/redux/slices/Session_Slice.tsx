import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Session {
  duration: Array<number>; // Duration in minutes
}

const initialState: Session = {
  duration: [25, 5, 15], // Focus - Short Break - Long Break
};

export const sessionSlice = createSlice({
  name: "sessionSlice",
  initialState,
  reducers: {
    setFocus: (state, action: PayloadAction<number>) => {
      state.duration[0] = action.payload;
    },
    setShortBreak: (state, action: PayloadAction<number>) => {
      state.duration[1] = action.payload;
    },
    setLongBreak: (state, action: PayloadAction<number>) => {
      state.duration[2] = action.payload;
    },
  },
});

export const { setFocus, setShortBreak, setLongBreak } = sessionSlice.actions;

export default sessionSlice.reducer;
