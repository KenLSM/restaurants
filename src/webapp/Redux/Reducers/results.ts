import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '@/Utils/api';

export interface SearchRow {
  name: string;
  createdAt: string;
  updatedAt: string;
  id: number;
}
interface ResultsState {
  query: string;
  results: Array<SearchRow>;
}

const initialState = {
  query: '',
  results: [],
} as ResultsState;

export const getSearch = createAsyncThunk('results/getSearch', async (query: string) => {
  const response = await get('/search?restaurants=' + query).then(d => d.json());
  return response;
});

export const ResultsSlice = createSlice({
  name: 'results',
  initialState,

  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSearch.fulfilled, (state, action) => {
        console.log(action.payload.rows);
        // state.results = [...state.results, ...action.payload.rows];
        state.results = action.payload.rows;
      })
      .addCase(getSearch.rejected, (state, action) => {
        console.error(action);
      });
  },
});

export const { updateQuery } = ResultsSlice.actions;
export default ResultsSlice.reducer;
