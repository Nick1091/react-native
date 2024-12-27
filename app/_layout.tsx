import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appearance } from 'react-native';
import Button from '@/components/Button';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import Toast from 'react-native-toast-message';
import { useCheckAuth } from '@/providers/usecheckAuth';

type ArticleRouteParams = { id: string, title: string; };

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [_, setColorScheme] = useState(
    Appearance.getColorScheme()
  );

  useEffect(() => {
    Appearance.addChangeListener(({colorScheme}) => setColorScheme(colorScheme));
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  
  return (
    <AuthProvider>
      <Provider store={store}>
        <SafeAreaProvider>
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{}}>
              <Stack.Screen
                name="index"
                options={(navigation) => {
                  const { isAuthenticated } = useAuth();
                  return {
                    headerShown: true,
                    title: 'Home',
                    headerRight: () => (
                      <Button
                        theme="secondary"
                        onPress={() => {
                          isAuthenticated
                            ? navigation.navigation.navigate('profile/index')
                            : navigation.navigation.navigate('login/index');
                        }}
                        label={isAuthenticated ? 'Profile' : 'login'}
                      />
                    ),
                  };
                }}
              />
              <Stack.Screen
                name="login/index"
                options={({ route }) => {
                  return { headerShown: true, title: `Login` };
                }}
              />
              <Stack.Screen
                name="register/index"
                options={({ route }) => {
                  return { headerShown: true, title: `Register` };
                }}
              />
              <Stack.Screen
                name="profile/index"
                  options={({ route }) => {
                    return {
                      headerShown: true,
                      title: 'Profile',
                    }
                }}
              />
              <Stack.Screen
                name="articles/[id]"
                options={({ route }) => {
                  const { id, title } = route.params as ArticleRouteParams;
                  return { headerShown: true, title: title || `Article ${id}` };
                }}
              />
              <Stack.Screen
                name="articles/create"
                options={({ route }) => {
                  const { id } = route.params as ArticleRouteParams;
                  return { headerShown: true, title: `Create an article` };
                }}
              />
              <Stack.Screen
                name="articles/edit/[id]"
                options={({ route }) => {
                  return { headerShown: true, title: `Edit an article` };
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
          <StatusBar style="light" />
          <Toast />
        </SafeAreaProvider>
      </Provider>
    </AuthProvider>
  );
}
