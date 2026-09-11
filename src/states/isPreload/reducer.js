import {createSlice} from '@reduxjs/toolkit';

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState: true,
  reducers: {
    setPreloadDone: () => false,
  },
});

export const {setPreloadDone} = isPreloadSlice.actions;
export default isPreloadSlice.reducer;
