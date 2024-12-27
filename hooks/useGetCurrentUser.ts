import { TokenService } from '@/services';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export const useGetCurrentUser = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await TokenService.getAccessToken();
      if (token) {
        setAccessToken(jwtDecode(token));
      }
    };

    fetchToken();
  }, []);

  return accessToken;
};
