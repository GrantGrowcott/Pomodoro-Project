import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  open: boolean;
  value: string;
  items: { label: string; value: string }[];
}


const taskSlice = createSlice({
  name: 'task',
  initialState: {
    selectedCategory: 'General',
    description: '',
    title: '',
    storedNotes: [], 
    open: false ,
    value: '',
    items: [
      { label: 'General', value: 'General' },
      { label: 'Work', value: 'Work' },
      { label: 'Exercise', value: 'Exercise' },
      { label: 'Meditation', value: 'Meditation' },
      { label: 'Read', value: 'Read' },
    ],
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
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },  
    setValue :(state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setItems: (state, action: PayloadAction<{ label: string; value: string }[]>) => {
      state.items = action.payload;
    }, 
    editNote: (state, action: PayloadAction<{ index: number; updatedNote: Note }>) => {
      const { index, updatedNote } = action.payload;
      state.storedNotes[index] = updatedNote;
    },

  },
});

export const { setSelectedCategory, setDescription, setTitle, setStoredNotes, setOpen, setValue, setItems, editNote } = taskSlice.actions;

export default taskSlice.reducer;
