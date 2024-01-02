import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BottomNavigationBar from '../components/BottomNavigationBar';
import BlogHomeHeader from '../components/BlogHomeHeader';
import {Switch} from 'react-native';
import ToggleDarkTheme from '../components/ToggleDarkTheme';
import {useAppSelector} from '../redux/app/hook';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      {/* <View
        style={{
          marginTop: 30,
          height: 60,
          flexDirection: 'row',
          backgroundColor: '#719071',
          alignItems: 'center',
          padding: 10,
          borderRadius: 15,
          gap: 10,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: isDarkTheme ? '#F4F6F4' : '#F4F6F4',
            fontWeight: '600',
            fontSize: 18,
          }}>
          All Bookmarks
        </Text>
        <Icon
          style={{
            color: isDarkTheme ? '#070907' : '#F4F6F4',
            fontSize: 24,
            marginRight: 10,
            fontWeight: '600',
          }}
          name="bookmark-o"></Icon>
      </View> */}
      <BottomNavigationBar currentPage="OtherToolsScreen" />
    </View>
  );
};

export default OtherToolsScreen;

const styles = StyleSheet.create({});
