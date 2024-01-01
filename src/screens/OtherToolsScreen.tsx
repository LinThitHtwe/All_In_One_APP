import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BottomNavigationBar from '../components/BottomNavigationBar';
import BlogHomeHeader from '../components/BlogHomeHeader';
import {Switch} from 'react-native';

type Props = {};

const OtherToolsScreen = (props: Props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: '#F7F9F7', padding: 20}}>
      <BlogHomeHeader />
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
          onValueChange={() => setIsDarkTheme(!isDarkTheme)}
          value={isDarkTheme}
        />
      </View>
      <BottomNavigationBar currentPage="OtherToolsScreen" />
    </View>
  );
};

export default OtherToolsScreen;

const styles = StyleSheet.create({});
