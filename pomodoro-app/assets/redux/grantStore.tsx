import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../redux/slices/grant_Slice'

const store = configureStore({
  reducer: {
    task: taskReducer, 
  },
});


export type RootState = ReturnType<typeof store.getState>;
export default store;
