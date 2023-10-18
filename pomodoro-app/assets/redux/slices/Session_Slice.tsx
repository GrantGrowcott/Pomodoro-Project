import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Session {
  duration: Array<number>; // Duration in minutes
  type: Array<string>; // Type of session
  currentType: string; // Select type of session for customization
}

const initialState: Session = {
  duration: [1, 5, 15], // Focus - Short Break - Long Break
  type: ["focus", "short", "long"],
  currentType: "focus",
};

export const sessionSlice = createSlice({
  name: "sessionSlice",
  initialState,
  reducers: {
    setDuration: (state, action: PayloadAction<number>) => {
      // Select a type of session then change its duration
      // The timer will take its initial time from this value customizable array
      if (state.currentType === "focus") state.duration[0] = action.payload;
      if (state.currentType === "short") state.duration[1] = action.payload;
      if (state.currentType === "long") state.duration[2] = action.payload;
    },
  },
});

export const { setDuration } = sessionSlice.actions;

export default sessionSlice.reducer;
