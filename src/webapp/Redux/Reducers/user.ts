import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '@/Utils/api';

/**
 * Check if user already has cookie
 */
export const getUser = createAsyncThunk(`user/get`, async () => {
  const response = await get('/user').then(d => d.json());
  return response;
});

export const register = createAsyncThunk(`user/register`, async (username: string) => {
  const response = await get('/user/register?username=' + username).then(d => d.json());
  return response;
});

export const login = createAsyncThunk(`user/login`, async (username: string) => {
  const response = await get('/user/login?username=' + username).then(d => d.json());
  return response;
});

interface UserState {
  username: string | void;
  firstName: string | void;
  lastName: string | void;
  userid: number | void;
}
const initialState = {
  username: null,
  firstName: null,
  lastName: null,

  userid: null,
} as UserState;

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(login.pending, (state, action) => {})
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.userid = action.payload.id;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.userid = action.payload.id;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.userid = action.payload.id;
      }),
});

export default UserSlice.reducer;
