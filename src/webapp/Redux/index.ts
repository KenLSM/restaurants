import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from './Reducers/results';
import userReducer from './Reducers/user';

const store = configureStore({
  reducer: {
    results: resultsReducer,
    user: userReducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export default store;
