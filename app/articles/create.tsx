import React, { useEffect } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ThemedView } from '@/components/ThemedView';
import { useCreateMutation } from '@/api';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/providers/AuthProvider';
import Toast from 'react-native-toast-message';
import Button from '@/components/Button';

type ArticleFormData = {
  title: string;
  content: string;
};

export default function CreateArticle() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormData>();
  const { isAuthenticated } = useAuth();
  const [createArticle] = useCreateMutation();
  const navigation = useNavigation();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('index' as never);
    }
  }, [isAuthenticated, navigation]);

  const onSubmit: SubmitHandler<ArticleFormData> = async (data) => {
    try {
      await createArticle(data).unwrap();
      navigation.navigate('index' as never);
      Toast.show({text1: 'Crete successful!'});
    } catch (error) {
      Toast.show({ text1: 'Failed to create article. Please try again.' });
    }
  };

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
          label="Create an Article"
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
