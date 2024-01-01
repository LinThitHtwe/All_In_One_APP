import {StyleSheet, Switch, Text, View} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../redux/app/hook';
import {actions} from '../redux/features/theme/themeSlice';

type Props = {};

const ToggleDarkTheme = (props: Props) => {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);

  const handleToggleTheme = () => {
    dispatch(actions.changeTheme());
  };
  return (
    <View
      style={{
        height: 60,
        marginTop: 80,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#719071',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          color: isDarkTheme ? '#070907' : '#F4F6F4',
          fontWeight: '600',
          fontSize: 20,
        }}>
        Toggle Dark Theme
      </Text>
      <Switch
        style={{height: 40}}
        trackColor={{false: '#080A08', true: '#AABDBA'}}
        thumbColor={isDarkTheme ? '#F4F6F4' : '#F4F6F4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleToggleTheme}
        value={isDarkTheme}
      />
    </View>
  );
};

export default ToggleDarkTheme;

const styles = StyleSheet.create({});
