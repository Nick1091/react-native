import { StyleSheet, View, FlatList, useColorScheme, TouchableOpacity } from 'react-native';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';
import { useDeleteMutation, useGetArticlesQuery } from '@/api';
import { Href, Link, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { ArticleRouteParams } from '@/components/AppNavigator';

export default function Home() {
  const { data: articles } = useGetArticlesQuery(undefined);
  const [deleteArticle] = useDeleteMutation();
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <ThemedView style={styles.titleContainer}>
      <View style={styles.title}>
        <HelloWave />
      </View>
      <Link
        href="/articles/create"
        style={[styles.link, { color: Colors[colorScheme ?? 'light'].text }]}
      >
        <ThemedText type="link">Create your own article</ThemedText>
      </Link>
      <View style={styles.content}>
        <FlatList
          data={articles || []}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableOpacity
                onPress={() =>
                  router.push(
                    `/articles/${item.uid}?title=${encodeURIComponent(
                      item.title
                    )}` as unknown as Href<ArticleRouteParams>
                  )
                }
              >
                <ThemedText style={styles.title}>{item.title}</ThemedText>
              </TouchableOpacity>
              <View style={styles.itemButtons}>
                <TouchableOpacity
                  testID={`edit-${item.uid}`}
                  onPress={() => router.push(`/articles/edit/${item.uid}`)}
                >
                  <MaterialIcons name={'edit'} size={24} color="#181616" />
                </TouchableOpacity>
                <TouchableOpacity
                  testID={`delete-${item.uid}`}
                  onPress={() => deleteArticle(item.uid)}
                >
                  <MaterialIcons name={'delete'} size={24} color="#181616" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
  button: {
    width: 'auto',
    color: '#0a7ea4',
    borderWidth: 0,
    alignItems: 'center',
  },
  link: {
    marginTop: 10,
    paddingVertical: 10,
    alignSelf: 'flex-end',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 18,
    lineHeight: 20,
  },
  titleButton: {
    maxWidth: '50%',
    borderWidth: 0,
    padding: 0,
    margin: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#d8dadb',
  },
  itemButtons: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 12,
    borderBottomWidth: 0,
    borderBottomColor: '#d8dadb',
  },
});
