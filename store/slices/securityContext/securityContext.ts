import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

import { authApi } from '@/api';

import { RootState } from '@/store/types';

export const SECURITY_SLICE_NAME = 'secutity';

export interface SecurityState {
  token?: string;
  roles: string[];
  accountId?: string;
}

const initialState: SecurityState = { token: '', roles: [] };

const tokenToState = (state: SecurityState, token: string) => {
  state.token = token;
  const decoded: { roles: string[]; sub: string } = jwtDecode(state.token);
  state.roles = decoded.roles;
  state.accountId = decoded.sub;
};

export const securitySlice = createSlice({
  name: SECURITY_SLICE_NAME,
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      tokenToState(state, payload);
    },
  },
  extraReducers(builder) {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      tokenToState(state, payload.token);
    });
    builder.addMatcher(authApi.endpoints.confirmEmail.matchFulfilled, (state, { payload }) => {
      tokenToState(state, payload.token);
    });
  },
});

export const { setToken } = securitySlice.actions;

export const roleReducer = securitySlice.reducer;

export const hasRole = (role: string) => (state: RootState) => {
  return state.secutity.roles.indexOf(role) > -1;
};

export const isAdmin = () => (state: RootState) => {
  return hasRole('ADMIN')(state);
};

export const currentAccountId = () => (state: RootState) => state.secutity.accountId;
