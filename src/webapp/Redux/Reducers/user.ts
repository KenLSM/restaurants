import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '@/Utils/api';
import type { SearchRow } from './results';

/**
 * Check if user already has cookie
 */
export const getUser = createAsyncThunk(`user/get`, async () => {
  const response = await get('/user').then(d => d.json());
  return response;
});

export const login = createAsyncThunk(`user/login`, async (username: string) => {
  const response = await get('/user/login?username=' + username).then(d => d.json());
  return response;
});

export const getCollection = createAsyncThunk(`user/getCollection`, async () => {
  const response = await get('/user/collection').then(d => d.json());
  return response;
});

export const addCollection = createAsyncThunk(`user/addCollection`, async (rstId: number) => {
  const response = await get('/user/collection/add?rstId=' + rstId).then(d => d.json());
  return response;
});

interface Collection {
  id: number;
  RestaurantId: number;
  ownerId: number;
}

interface UserState {
  username: string | void;
  firstName: string | void;
  lastName: string | void;
  userid: number | void;
  collections: Array<Collection>;
}
const initialState = {
  username: null,
  firstName: null,
  lastName: null,

  userid: null,
  collections: [],
} as UserState;

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state, action) => {})
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.userid = action.payload.id;
      })
      .addCase(getCollection.fulfilled, (state, action) => {
        console.log(action);
        state.collections = action.payload.rows.reduce((accum, curRow) => {
          return accum.concat(curRow.Restaurant);
        }, []);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.userid = action.payload.id;
      })
      .addCase(addCollection.fulfilled, (state, action) => {
        // state.collections = [...state.collections, action.payload.rows];
      });
  },
});

export default UserSlice.reducer;
