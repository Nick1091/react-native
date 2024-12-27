import React, { useEffect } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '@/providers/AuthProvider';
import Toast from 'react-native-toast-message';
import Button from '@/components/Button';
import { useGetArticleQuery, useUpdateMutation } from '@/api';

type ArticleFormData = {
  title: string;
  content: string;
};

export default function EditArticle() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ArticleFormData>();
  const { isAuthenticated } = useAuth();
  const [updateArticle] = useUpdateMutation();
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
    if (article) {
      setValue('title', article.title);
      setValue('content', article.content);
    } else if (!isLoading && !article) {
      navigation.navigate('index' as never);
    }
  }, [article, isLoading, setValue, navigation]);

  const onSubmit: SubmitHandler<ArticleFormData> = async (data) => {
    try {
      if(article) {
        await updateArticle({
          uid: article.uid,
          title: data.title,
          content: data.content,
          userUid: article.userUid,
        }).unwrap();
        navigation.navigate('index' as never);
        Toast.show({ text1: 'Update successful!' });
      } else {
        Toast.show({ text1: 'Failed to update article. Please try again.' });
        navigation.navigate('index' as never);
      }
    } catch (error) {
      Toast.show({ text1: 'Failed to update article. Please try again.' });
    }
  };

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

  return (
    <ThemedView style={styles.titleContainer}>
      <View style={styles.form}>
        <Controller
          control={control}
          rules={{
            required: 'Title is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Title"
            />
          )}
          name="title"
        />
        {errors.title && (
          <Text style={styles.errorText}>{errors.title.message}</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: 'Content is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.textarea]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Content"
              multiline
              numberOfLines={4}
            />
          )}
          name="content"
        />
        {errors.content && (
          <Text style={styles.errorText}>{errors.content.message}</Text>
        )}

        <Button
          label="Update Article"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
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
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  textarea: {
    height: 200,
  },
  errorText: {
    color: 'red',
    width: '90%',
    marginBottom: 10,
    alignSelf: 'center',
  },
  button: {
    width: '90%',
    alignItems: 'center',
  },
});
