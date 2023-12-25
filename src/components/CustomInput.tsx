import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {FC} from 'react';
import {Control, Controller, FieldValues} from 'react-hook-form';

type Props = {
  label: string;
  name: 'title' | 'description';
  control: Control<{title: string; description?: string | undefined}, any>;
  placeholder: string;
  height: number;
};

const CustomInput: FC<Props> = ({
  label,
  name,
  control,
  placeholder,
  height,
}) => {
  return (
    <Controller
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <Text
            style={{
              fontSize: 25,
              color: '#15212F',
              marginTop: 25,
              marginBottom: 10,
              fontWeight: '400',
              fontFamily: 'monospace',
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
            multiline
            numberOfLines={4}
            placeholder={error ? error.message : placeholder}
            placeholderTextColor={error ? '#FF0000' : 'rgba(21, 33, 47, 0.3)'}
            style={{
              borderWidth: 1,
              borderColor: error ? '#FF0000' : 'rgba(21, 33, 47, 0.6)',
              padding: 10,
              borderRadius: 15,
              color: '#15212F',
              height: height,
              fontFamily: 'monospace',
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
