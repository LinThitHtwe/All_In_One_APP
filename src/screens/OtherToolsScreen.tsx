import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BottomNavigationBar from '../components/BottomNavigationBar';
import BlogHomeHeader from '../components/BlogHomeHeader';
import {Switch} from 'react-native';
import ToggleDarkTheme from '../components/ToggleDarkTheme';

type Props = {};

const OtherToolsScreen = (props: Props) => {
  return (
    <View style={{flex: 1, backgroundColor: '#F7F9F7', padding: 20}}>
      <BlogHomeHeader />
      <ToggleDarkTheme />
      <BottomNavigationBar currentPage="OtherToolsScreen" />
    </View>
  );
};

export default OtherToolsScreen;

const styles = StyleSheet.create({});
