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
      }}>
      <Text style={{color: '#080A08', fontSize: 20}}>Toggle Dark Theme</Text>
      <Switch
        style={{height: 40}}
        trackColor={{false: '#080A08', true: '#92A8AA'}}
        thumbColor={isDarkTheme ? '#719071' : '#AABDBA'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleToggleTheme}
        value={isDarkTheme}
      />
    </View>
  );
};

export default ToggleDarkTheme;

const styles = StyleSheet.create({});
