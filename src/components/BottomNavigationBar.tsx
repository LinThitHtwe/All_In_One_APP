import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../redux/app/hook';

type Props = {
  currentPage: string;
};

const BottomNavigationBar = ({currentPage}: Props) => {
  const navigation = useNavigation();
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  return (
    <View
      style={{
        borderColor: '#708F70',
        // borderTopWidth: isDarkTheme ? 1 : 0,
        backgroundColor: isDarkTheme ? '#070907' : '#F7F9F7',
        height: 55,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
      }}>
      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Icon
          style={{
            color: isDarkTheme
              ? currentPage === 'HomeScreen'
                ? '#708F70'
                : 'rgba(244, 246, 244,0.3)'
              : currentPage === 'HomeScreen'
              ? '#92A8AA'
              : 'rgba(8,10,8,0.3)',
            fontSize: 28,
          }}
          name="home"></Icon>

        <Text
          style={{
            color: isDarkTheme
              ? currentPage === 'HomeScreen'
                ? '#708F70'
                : 'rgba(244, 246, 244,0.3)'
              : currentPage === 'HomeScreen'
              ? '#92A8AA'
              : 'rgba(8,10,8,0.3)',
            fontWeight: '900',
          }}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={() => navigation.navigate('BlogHomeScreen')}>
        <Icon
          style={{
            color: isDarkTheme
              ? currentPage === 'BlogHomeScreen'
                ? '#708F70'
                : 'rgba(244, 246, 244,0.3)'
              : currentPage === 'BlogHomeScreen'
              ? '#92A8AA'
              : 'rgba(8,10,8,0.3)',
            fontSize: 28,
          }}
          name="list-alt"></Icon>
        <Text
          style={{
            color: isDarkTheme
              ? currentPage === 'BlogHomeScreen'
                ? '#708F70'
                : 'rgba(244, 246, 244,0.3)'
              : currentPage === 'BlogHomeScreen'
              ? '#92A8AA'
              : 'rgba(8,10,8,0.3)',
            fontWeight: '900',
          }}>
          Blogs
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={() => navigation.navigate('AddBlogFormScreen')}>
        <Icon
          style={{
            color: isDarkTheme
              ? currentPage === 'AddBlogFormScreen'
                ? '#708F70'
                : 'rgba(244, 246, 244,0.3)'
              : currentPage === 'AddBlogFormScreen'
              ? '#92A8AA'
              : 'rgba(8,10,8,0.3)',
            fontSize: 28,
          }}
          name="plus"></Icon>
        <Text
          style={{
            color: isDarkTheme
              ? currentPage === 'AddBlogFormScreen'
                ? '#708F70'
                : 'rgba(244, 246, 244,0.3)'
              : currentPage === 'AddBlogFormScreen'
              ? '#92A8AA'
              : 'rgba(8,10,8,0.3)',
            fontWeight: '900',
          }}>
          Post Blog
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('OtherToolsScreen')}
        style={{alignItems: 'center'}}>
        <Icon
          style={{
            color: isDarkTheme
              ? currentPage === 'OtherToolsScreen'
                ? '#708F70'
                : 'rgba(244, 246, 244,0.3)'
              : currentPage === 'OtherToolsScreen'
              ? '#92A8AA'
              : 'rgba(8,10,8,0.3)',
            fontSize: 26,
          }}
          name="list"></Icon>
        <Text
          style={{
            color: isDarkTheme
              ? currentPage === 'OtherToolsScreen'
                ? '#708F70'
                : 'rgba(244, 246, 244,0.3)'
              : currentPage === 'OtherToolsScreen'
              ? '#92A8AA'
              : 'rgba(8,10,8,0.3)',
            fontWeight: '900',
          }}>
          Others
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigationBar;

const styles = StyleSheet.create({});
