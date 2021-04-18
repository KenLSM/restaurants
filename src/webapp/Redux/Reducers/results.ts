import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '@/Utils/api';

const initialState = {
  query: '',
  results: [],
};

export const getSearch = createAsyncThunk('results/getSearch', async query => {
  console.log('searchedd');
  // const response = '';
  const response = await get('/search?restaurants=' + query);
  return response;
});

console.log(getSearch('a'));
export const ResultsSlice = createSlice({
  name: 'results',
  initialState,

  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
    updateResults: (state, action) => {
      state.results = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSearch.fulfilled, (state, action) => {
        console.log(action.payload);
        // state.results = action.payload;
      })
      .addCase(getSearch.rejected, (state, action) => {
        console.error(action);
      });
  },
});

export const { updateQuery } = ResultsSlice.actions;
export default ResultsSlice.reducer;
