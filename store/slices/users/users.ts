import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../types';

import { USER_SLICE_NAME, initialState } from './constants';
import { authApi } from '@/api';

const authSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder.addMatcher(authApi.endpoints.signup.matchFulfilled, (state, { payload }) => {
        state.currentUser = payload;
      });
    },
});

export const { } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export const authReducer = authSlice.reducer;
