import React, { useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/providers/AuthProvider';
import InputField from '@/components/InputField';
import PasswordField from '@/components/PasswordField';
import Button from '@/components/Button';
import { useLoginMutation } from '@/api';
import { TokenService } from '@/services';
import Toast from 'react-native-toast-message';

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [loginUser] = useLoginMutation();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('index' as never);
    }
  }, [isAuthenticated, navigation]);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const accessToken = (await loginUser(data).unwrap()).accessToken;
      if (accessToken) {
        TokenService.setAccessToken(accessToken)
        Toast.show({text1: 'Signin successful!'});
        navigation.navigate('index' as never);
        setIsAuthenticated('');
      }
    } catch (error) {
      console.error(error);
      Toast.show({ text1: 'Registration failed. Please try again.' });
    }
  };

  return (
    <ThemedView style={styles.titleContainer}>
      <View style={styles.form}>
        <View style={styles.field}>
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
        </View>
        <View style={styles.field}>
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
        </View>

        <Button
          label="Login"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        />

        <View style={styles.registerContainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('register/index' as never)}
          >
            <Text style={styles.registerText}>Register here</Text>
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
  form: {
    width: '100%',
    alignItems: 'center',
  },
  field: {
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    width: '90%',
    marginBottom: 10,
    alignSelf: 'center',
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
  button: {
    width: '90%',
    alignItems: 'center',
  },
});
