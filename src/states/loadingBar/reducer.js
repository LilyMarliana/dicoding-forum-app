import {createSlice} from '@reduxjs/toolkit';

const loadingBarSlice = createSlice({
  name: 'isLoading',
  initialState: false,
  reducers: {
    showLoading: () => true,
    hideLoading: () => false,
  },
});

export const {showLoading, hideLoading} = loadingBarSlice.actions;
export default loadingBarSlice.reducer;
