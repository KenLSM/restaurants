import { createSlice } from '@reduxjs/toolkit';

interface AlertState {
  isOpen: boolean;
  title: string;
  type: 'success' | 'warning' | 'danger' | 'info';
}
const initialState = { isOpen: false, title: '' } as AlertState;
export const AlertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showSuccessAlert: (state, action) => {
      state.isOpen = true;
      state.title = action.payload;
      state.type = 'success';
    },
    showDangerAlert: (state, action) => {
      state.isOpen = true;
      state.title = action.payload;
      state.type = 'danger';
    },
    showWarningAlert: (state, action) => {
      state.isOpen = true;
      state.title = action.payload;
      state.type = 'warning';
    },
    dismissAlert: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const {
  showSuccessAlert,
  showDangerAlert,
  showWarningAlert,
  dismissAlert,
} = AlertSlice.actions;
export default AlertSlice.reducer;
