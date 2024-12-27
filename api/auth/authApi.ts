import { baseApi } from '../base';

import { AUTH_PATH } from './constants';
import { Auth } from './types';
import { User } from '../user/types';
import { LoginDto, SignupDto } from './auth-dto';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Auth, LoginDto>({
      query: (body) => ({
        url: `${AUTH_PATH}/signin`,
        method: 'POST',
        data: body,
        skipAuth: true,
      }),
    }),
    signup: builder.mutation<User, SignupDto>({
      query: (body) => ({
        url: `${AUTH_PATH}/signup`,
        method: 'POST',
        data: body,
        skipAuth: true,
      }),
    }),
    logout: builder.query<void, void>({
      query: () => ({
        url: `${AUTH_PATH}/logout`,
        method: 'GET',
      }),
    }),
    refresh: builder.query<Auth, void>({
      query: (email) => ({
        url: `${AUTH_PATH}/refresh`,
        method: 'GET',
        skipAuth: true,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutQuery,
  useRefreshQuery,
} = authApi;
