import { createApi } from '@reduxjs/toolkit/query/react';

import { TAG_TYPES } from '../constants';

import { axiosJson } from './axiosJson';
import axiosBaseQuery from './axiosBaseQuery';
import { BASE_API_REDUCER_KEY } from './constants';

export const baseApi = createApi({
  reducerPath: BASE_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery({ axiosInstance: axiosJson }),
  tagTypes: TAG_TYPES,
  endpoints: () => ({}),
});
