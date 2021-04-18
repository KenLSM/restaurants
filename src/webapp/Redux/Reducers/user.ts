import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '@/Utils/api';

export const login = createAsyncThunk(`user/login`, async (username: string) => {
  const response = await get('/user/login?username=' + username).then(d => d.json());
  return response;
});

export const getCollection = createAsyncThunk(`user/getCollection`, async () => {
  const response = await get('/user/collection').then(d => d.json());
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
        state.collections = action.payload.rows;
      });
  },
});

export default UserSlice.reducer;
