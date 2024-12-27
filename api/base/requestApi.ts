import { TokenService } from '@/services';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Toast from 'react-native-toast-message'
import { BASE_URL } from './constants';

export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message;

  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message
}

export const request = async <T>() => {
  const onSuccess = (response: AxiosResponse<T>) => response.data
  const onError = (error: AxiosError<T>) => {
    Toast.show({
      type: 'error',
      text1: 'Req error',
      text2: errorCatch(error)
    })

    return Promise.reject(error)
  }
}

export const getNewTokens = async () => {
  try {
    const accessToken = await TokenService.getAccessToken()

    const { data } = await axios.post<{ accessToken: string }>(
      `${BASE_URL}/auth/refresh`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,

      }
    );

    if (data.accessToken) await TokenService.setAccessToken(data.accessToken);
  } catch (e) {}
}
