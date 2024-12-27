import axios, {
  AxiosError,
  AxiosRequestConfig,
} from 'axios';
import { BASE_URL } from './constants';
import { TokenService } from '@/services';
type Headers = Record<string, string>;

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

export const createCustomAxiosInstance = (headers: Headers) => {
  const instance = axios.create({
    baseURL: process.env.BASE_URL || BASE_URL,
    headers,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    async (config) => {
      const token = await TokenService.getAccessToken();
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalConfig = { ...error.config } as AxiosRequestConfigWithRetry;

      if (
        originalConfig &&
        error.response?.status === 401 &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        try {
          const { data } = await axios.post<{ accessToken: string }>(
            `${BASE_URL}/auth/refresh`,
            {
              headers : {
                'Content-Type': 'application/json',
              }
            },
            {
              withCredentials: true,
            }
          );

          const { accessToken } = data;
          await TokenService.setAccessToken(accessToken);

          if (originalConfig.headers) {
            originalConfig.headers.Authorization = `${accessToken}`;
          }

          return instance(originalConfig);
        } catch (refreshError) {
          await TokenService.clearAccessToken();
          return Promise.reject(refreshError);
        }
      }

      console.error('Axios response error:', error);
      return Promise.reject(error);
    }
  );

  return instance;
};
