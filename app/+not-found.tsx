import { Link, Stack } from 'expo-router';
import { StyleSheet, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Colors } from '@/constants/Colors';

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!', headerShown: false }} />
      <ThemedView
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme ?? 'light'].backgroundColor },
        ]}
      >
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link
          href="/"
          style={
            (styles.link,
            { color: Colors[colorScheme ?? 'light'].text })
          }
        >
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
