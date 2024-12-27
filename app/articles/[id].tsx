import React, { useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '@/providers/AuthProvider';
import Toast from 'react-native-toast-message';
import { useGetArticleQuery } from '@/api';

export default function ViewArticle() {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { data: article, error, isLoading } = useGetArticleQuery(id);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('index' as never);
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    if (!isLoading && !article) {
      Toast.show({ text1: 'Article not found. Redirecting to home.' });
      navigation.navigate('index' as never);
    }
  }, [article, isLoading, navigation]);

  if (isLoading) {
    return (
      <ThemedView style={styles.titleContainer}>
        <Text>Loading...</Text>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.titleContainer}>
        <Text>Error loading article</Text>
      </ThemedView>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <ThemedView style={styles.titleContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.text}>{article.content}</Text>
      </View>
    </ThemedView>
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
  content: {
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});
