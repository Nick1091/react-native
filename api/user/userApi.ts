
import { LoginDto } from '../auth/auth-dto';
import { baseApi } from '../base';

import { USER_PATH } from './constants';
import { User } from './types';
import { PutUserDto } from './user-dto';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (uid: string) => `${USER_PATH}/${uid}`,
    }),

    updateUser: builder.mutation<User, PutUserDto>({
      query: (body) => ({
        url: `${USER_PATH}/${body.uid}`,
        method: 'PUT',
        data: body,
      }),
    }),
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: `${USER_PATH}`,
        method: 'GET',
      }),
    }),
    createUser: builder.mutation<User, LoginDto>({
      query: (body) => ({
        url: `${USER_PATH}`,
        method: 'Post',
        data: body,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (uid: string) => ({
        url: `${USER_PATH}/${uid}`,
        method: 'Delete',
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;

export const selectUsersCurrentResult = userApi.endpoints.getUsers.select();
