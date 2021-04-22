import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from './Reducers/results';
import userReducer from './Reducers/user';
import collectionReducer from './Reducers/collection';
import alertReducer from './Reducers/alert';

const store = configureStore({
  reducer: {
    results: resultsReducer,
    user: userReducer,
    collection: collectionReducer,
    alert: alertReducer,
  },
});

// @ts-ignore
export type RootStore = ReturnType<typeof store.getState>;
export default store;
