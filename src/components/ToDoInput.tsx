import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';

const ToDoInput = ({label, name, control, placeholder, height}) => {
  return (
    <Controller
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <Text
            style={{
              fontSize: 25,
              color: '#15212F',
              marginVertical: 5,
              fontWeight: '400',
              fontFamily: 'monospace',
            }}>
            {label}
          </Text>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder={placeholder}
            placeholderTextColor={'rgba(21, 33, 47,0.3)'}
            style={{
              borderWidth: 1,
              borderColor: 'rgba(21, 33, 47,0.6)',
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

export default ToDoInput;

const styles = StyleSheet.create({});
