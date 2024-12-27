import { createSlice } from '@reduxjs/toolkit';

import { ARTICLES_SLICE_NAME, initialState } from './constants';

export const articleSlice = createSlice({
  name: ARTICLES_SLICE_NAME,
  initialState,
  reducers: {
   },
});



export const articleReducer = articleSlice.reducer;
