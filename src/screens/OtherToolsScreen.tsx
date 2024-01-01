import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BottomNavigationBar from '../components/BottomNavigationBar';
import BlogHomeHeader from '../components/BlogHomeHeader';
import {Switch} from 'react-native';
import ToggleDarkTheme from '../components/ToggleDarkTheme';
import {useAppSelector} from '../redux/app/hook';

type Props = {};

const OtherToolsScreen = (props: Props) => {
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkTheme ? '#070907' : '#F7F9F7',
        padding: 20,
      }}>
      <BlogHomeHeader />
      <ToggleDarkTheme />
      <BottomNavigationBar currentPage="OtherToolsScreen" />
    </View>
  );
};

export default OtherToolsScreen;

const styles = StyleSheet.create({});
