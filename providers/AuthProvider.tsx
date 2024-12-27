import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { TokenService } from '@/services';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({
  setIsAuthenticated: (auth: string) => {},
  isAuthenticated: '',
});

let ignore = SplashScreen.preventAutoHideAsync()

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<string>();

  useEffect(() => {
    let mounted = true

    const checkAccessToken = async () => {
      try {
        const accessToken = await TokenService.getAccessToken()

        if(accessToken) {
          const user = jwtDecode(accessToken); 
          if(mounted){
            setIsAuthenticated(user.sub);
          }
        }
      } catch{

      } finally{
        await SplashScreen.hideAsync()
      }
    } 

    let ignore = checkAccessToken();

    return () => {
      mounted = false;
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated: '', setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
