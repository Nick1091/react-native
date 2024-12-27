import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  RawAxiosRequestHeaders,
} from 'axios';
import { BaseQueryApi, BaseQueryFn } from '@reduxjs/toolkit/query';

import { AxiosBaseQueryError, Error as ErrorBody } from './types';
import { axiosJson } from './axiosJson';
import { TokenService } from '@/services';

interface AxiosBaseQueryArgs<Response> {
  axiosInstance: AxiosInstance;
  prepareHeaders?: (
    headers: RawAxiosRequestHeaders | AxiosRequestHeaders,
    api: BaseQueryApi
  ) => AxiosRequestHeaders;
  transformResponse?: (response: Response) => unknown;
}

interface ServiceExtraOptions {
  skipAuth?: boolean;
}

const getRequestConfig = (args: string | AxiosRequestConfig) => {
  if (typeof args === 'string') {
    return { url: args };
  }

  return args;
};

const axiosBaseQuery = <
  Args extends AxiosRequestConfig | string,
  Result = unknown,
  DefinitionExtraOptions extends ServiceExtraOptions = Record<string, unknown>
>(
  {
    axiosInstance,
    prepareHeaders,
    transformResponse,
  }: AxiosBaseQueryArgs<Result> = { axiosInstance: axiosJson }
): BaseQueryFn<Args, Result, AxiosBaseQueryError, DefinitionExtraOptions> => {
  return async (args, api, extraOptions) => {
    try {
      const requestConfig = getRequestConfig(args);

      let headers = requestConfig.headers || {};

      if (!extraOptions?.skipAuth) {
        const token = await TokenService.getAccessToken();
        if (token) {
          headers = {
            ...headers,
            Authorization: token,
          };
        }
      }
      
      const result = await axiosInstance({
        ...requestConfig,
        headers: prepareHeaders
          ? prepareHeaders(headers, api)
          : headers,
        signal: api.signal,
        ...extraOptions,
      });

      return {
        data: transformResponse ? transformResponse(result.data) : result.data,
      };
    } catch (axiosError) {
      const err = axiosError as AxiosError<ErrorBody>;
      console.error('Axios error:', err);

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};

export default axiosBaseQuery;
