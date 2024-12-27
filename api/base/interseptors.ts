import axios from "axios";
import { BASE_URL } from "./constants";
import { TokenService } from "@/services";
import { errorCatch, getNewTokens } from "./requestApi";

export const instance = axios.create({
  baseURL: process.env.BASE_URL || BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
  const accessToken = await TokenService.getAccessToken()

  if (config.headers && accessToken) config.headers.Authorization = accessToken

  return config
})

instance.interceptors.response.use((config) => 
  config, 
  async error => {
    const originalRequest = error.config 

    if ((error.response.status === 401 ||
        errorCatch(error) === 'jwt expired')
        && error.config && 
        !error.config._isRetry
    ){
      originalRequest._isRetry = true
      try {
        await getNewTokens()
        return instance.request(originalRequest)
      } catch (error) {
        if (errorCatch(error)) {
          TokenService.clearAccessToken()
        }
      }

    }
  }
)
