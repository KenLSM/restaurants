// import { combineReducers, createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from './results';

const store = configureStore({
  reducer: {
    results: resultsReducer,
  },
});
export default store;
