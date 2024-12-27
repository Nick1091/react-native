import React, { useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ThemedView } from '@/components/ThemedView';
import InputField from '@/components/InputField';
import PasswordField from '@/components/PasswordField';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import Button from '@/components/Button';
import { useSignupMutation } from '@/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type RegisterFormData = {
  email: string;
  password: string;
  passwordRepeat: string;
};

export default function Register() {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();
  const password = watch('password');


  const [signup] = useSignupMutation();

  useEffect(() => {
      if (isAuthenticated) {
        navigation.navigate('index' as never);
      }
    }, [isAuthenticated, navigation]);
  

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const response = await signup(data).unwrap();
      if (response) {
        toast.success('Registration successful!');
        navigation.navigate('login/index' as never);
      }
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <ThemedView style={styles.titleContainer}>
      <View style={styles.form}>
        <InputField
          control={control}
          name="email"
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Invalid email address',
            },
          }}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <PasswordField
          control={control}
          name="password"
          placeholder="Password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          }}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <PasswordField
          control={control}
          name="passwordRepeat"
          placeholder="Repeat Password"
          rules={{
            required: 'Repeat Password is required',
            validate: (value: string) =>
              value === password || 'Passwords do not match',
          }}
        />
        {errors.passwordRepeat && (
          <Text style={styles.errorText}>{errors.passwordRepeat.message}</Text>
        )}

        <Button
          label="Register"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        />
        <View style={styles.registerContainer}>
          <Text>Do you have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('login/index' as never)}
          >
            <Text style={styles.registerText}>Login here</Text>
          </TouchableOpacity>
        </View>
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
  errorText: {
    color: 'red',
    width: '90%',
    marginBottom: 10,
    alignSelf: 'center',
  },
  form: { width: '100%', alignItems: 'center' },
  field: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    alignItems: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    color: 'blue',
    marginLeft: 5,
  },
});
