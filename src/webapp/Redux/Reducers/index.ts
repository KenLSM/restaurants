import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from './results';

const store = configureStore({
  reducer: {
    results: resultsReducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export default store;
