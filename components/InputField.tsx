import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type InputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  rules?: object;
  secureTextEntry?: boolean;
};

const InputField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  rules,
  secureTextEntry,
}: InputFieldProps<T>) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
          />
        )}
        name={name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default InputField;
