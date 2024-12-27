import { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { TokenService } from "@/services";
import { errorCatch, getNewTokens } from "@/api/base/requestApi";

export const useCheckAuth = (routName?: string) => {
  const {isAuthenticated, setIsAuthenticated} = useAuth();

  useEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = await TokenService.getAccessToken();
      if (!!accessToken) {
        try {
          await getNewTokens();
        } catch (error) {
          if (errorCatch(error)) {
            TokenService.clearAccessToken();
            setIsAuthenticated('');
          }
        }
      }
    };

    let ignore = checkAccessToken();
  }, [routName]);
}
