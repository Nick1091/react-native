import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { baseApi } from '@/api';

import {
  authReducer,
} from './slices';
import { USER_SLICE_NAME } from './slices/users/constants';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [USER_SLICE_NAME]: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([baseApi.middleware]),
});

setupListeners(store.dispatch);
