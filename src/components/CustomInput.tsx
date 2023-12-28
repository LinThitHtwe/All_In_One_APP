import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {FC} from 'react';
import {Control, Controller, FieldValues} from 'react-hook-form';

type Props = {
  label: string;
  name: 'title' | 'description' | 'email' | 'password';
  // control: Control<
  //   {
  //     title: string;
  //     description?: string | undefined;
  //     email: string;
  //     password: string;
  //   },
  //   any
  // >;
  control: Control<any>;
  placeholder: string;
  height: number;
  inputType: string;
};

const CustomInput: FC<Props> = ({
  label,
  name,
  control,
  placeholder,
  height,
  inputType,
}) => {
  return (
    <Controller
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <Text
            style={{
              fontSize: 20,
              color: '#15212F',
              marginTop: 25,
              marginBottom: 10,
              fontWeight: '400',
            }}>
            {label}
          </Text>
          {error && (
            <Text style={{color: '#FF0000', fontSize: 12}}>
              {error.message}
            </Text>
          )}
          <TextInput
            value={value}
            onChangeText={text => onChange(text)}
            onBlur={onBlur}
            inputMode={inputType}
            multiline
            numberOfLines={10}
            placeholder={error ? error.message : placeholder}
            placeholderTextColor={error ? '#FF0000' : 'rgba(8, 10, 8, 0.3)'}
            style={{
              borderWidth: 1,
              borderColor: error ? '#FF0000' : 'rgba(8, 10, 8, 0.5)',
              padding: 10,
              borderRadius: 15,
              color: '#15212F',
              height: height,
              textAlignVertical: 'top',
            }}
          />
        </>
      )}
      name={name}
      control={control}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
