import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  title: string;
  description: string;
  category: string;
}

interface NoteState {
  selectedCategory: string;
  description: string;
  title: string;
  storedNotes: Note[];
}

const taskSlice = createSlice({
  name: "task",
  initialState: {
    selectedCategory: "General",
    description: "",
    title: "",
    storedNotes: [],
  } as NoteState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setStoredNotes: (state, action: PayloadAction<Note[]>) => {
      state.storedNotes = action.payload;
    },

    editNote: (
      state,
      action: PayloadAction<{ index: number; updatedNote: Note }>
    ) => {
      const { index, updatedNote } = action.payload;
      state.storedNotes[index] = updatedNote;
    },
  },
});

export const {
  setSelectedCategory,
  setDescription,
  setTitle,
  setStoredNotes,
  editNote,
} = taskSlice.actions;

export default taskSlice.reducer;
