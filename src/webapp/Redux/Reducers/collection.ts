import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '@/Utils/api';
import { showDangerAlert } from './alert';

export interface Restaurant {
  name: string;
}
export interface Collection {
  id: number;
  name: string;
  Restaurants: Array<Restaurant>;
  ownerId: number;
}

export const newCollection = createAsyncThunk(`collection/new`, async (name: string) => {
  const response = await get('/collection/new?name=' + name).then(d => d.json());
  return response;
});

export const addCollection = createAsyncThunk(
  'collection/add',
  async (query: { rstId: string; colId: string }, thunkApi) => {
    const queryParams = new URLSearchParams(query).toString();
    const response = await get('/collection/add?' + queryParams).then(d => d.json());

    if (response.err == -1) {
      thunkApi.dispatch(showDangerAlert(response.error_msg));
    }
    return response;
  }
);

export const getUserCollection = createAsyncThunk(`collection/user/get`, async () => {
  const response = await get('/collection/user/get').then(d => d.json());
  return response;
});

interface CollectionState {
  selectedCollectionId: number | void;
  collections: Array<Collection>;
}
const initialState = {
  selectedCollectionId: null,
  collections: [],
} as CollectionState;

export const CollectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollectionId: (state, action) => {
      state.selectedCollectionId = action.payload;
    },
  },
  extraReducers: builder =>
    builder.addCase(getUserCollection.fulfilled, (state, action) => {
      state.collections = action.payload.rows;
    }),
});

export const { setCollectionId } = CollectionSlice.actions;

export default CollectionSlice.reducer;
