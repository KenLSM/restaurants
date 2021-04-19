import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '@/Utils/api';

export interface OpeningTime {
  id: number;
  day: number;
  start: number;
  end: number;
}
export interface SearchRow {
  name: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  OpeningTimes: Array<OpeningTime>;
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

export const getSearchWithDate = createAsyncThunk(
  'results/getSearchWithDate',
  async (query: { strQ: string; dateQ: Date }) => {
    const { strQ, dateQ } = query;
    const minute = dateQ.getHours() * 60 + dateQ.getMinutes();
    const day = (dateQ.getDay() + 6) % 7;
    const response = await get(
      '/search?restaurants=' + strQ + '&minute=' + minute + '&day=' + day
    ).then(d => d.json());
    return response;
  }
);

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
        state.results = action.payload.rows;
      })
      .addCase(getSearch.rejected, (state, action) => {
        console.error(action);
      })
      .addCase(getSearchWithDate.fulfilled, (state, action) => {
        state.results = action.payload.rows;
      })
      .addCase(getSearchWithDate.rejected, (state, action) => {
        console.error(action);
      });
  },
});

export const { updateQuery } = ResultsSlice.actions;
export default ResultsSlice.reducer;
