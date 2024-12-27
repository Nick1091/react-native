import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store'

export const TokenService = {
  getAccessToken: async () => {
    try {
      const token = await getItemAsync('accessToken');
      return token;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },
  setAccessToken: async (token: string) => {
    try {
      await setItemAsync('accessToken', token);
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  },
  clearAccessToken: async () => {
    try {
      await deleteItemAsync('accessToken');
    } catch (error) {
      console.error('Error clearing access token:', error);
    }
  },
};
