import { Text, StyleSheet } from 'react-native';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import PrivateRoute from '@/components/navigation/PrivateRote';

export default function Profile() {
  return (
    <PrivateRoute>
      <ThemedView style={styles.titleContainer}>
        <Text>Profile screen</Text>
      </ThemedView>
    </PrivateRoute>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    height: '100%',
    padding: 24,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'rgba(0,0,0,0.5)',
  },
  Link: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'rgba(0,0,0,0.5)',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
