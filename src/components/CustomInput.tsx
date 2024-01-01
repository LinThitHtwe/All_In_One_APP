import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {FC, useState} from 'react';
import {Control, Controller} from 'react-hook-form';
import {useAppSelector} from '../redux/app/hook';

type Props = {
  label: string;
  name: 'title' | 'description' | 'email' | 'password';
  control: Control<any>;
  placeholder: string;
  inputType: string;
  height: number;
};

const CustomInput: FC<Props> = ({
  label,
  name,
  control,
  placeholder,
  inputType,
  height,
}) => {
  const [inputHeight, setInputHeight] = useState(height);
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  return (
    <Controller
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <Text
            style={{
              fontSize: 18,
              color: isDarkTheme ? '#F4F6F4' : '#090B09',
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
            onChangeText={text => {
              onChange(text);
              setInputHeight(Math.max(height, Math.min(200, text.length * 4)));
            }}
            onBlur={onBlur}
            inputMode={inputType}
            multiline
            placeholder={error ? error.message : placeholder}
            placeholderTextColor={
              error
                ? '#FF0000'
                : isDarkTheme
                ? 'rgba(244, 246, 244,0.4)'
                : 'rgba(8, 10, 8, 0.3)'
            }
            style={{
              borderBottomWidth: 1,
              borderColor: error
                ? '#FF0000'
                : isDarkTheme
                ? 'rgba(244, 246, 244,0.4)'
                : 'rgba(8, 10, 8, 0.3)',
              padding: 10,
              borderRadius: 15,
              color: '#15212F',
              height: inputHeight,
              textAlignVertical: 'top',
              fontSize: 18,
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
