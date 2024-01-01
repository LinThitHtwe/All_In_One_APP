import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import OnlineArticle from '../svgs/OnlineArticle';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../redux/app/hook';
type Props = {};

const ReadBlogsToday = (props: Props) => {
  const navigation = useNavigation();
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('BlogHomeScreen')}
      style={{
        backgroundColor: isDarkTheme ? '#708F70' : '#719071',
        height: 150,
        borderRadius: 10,
        padding: 10,
        position: 'relative',
        overflow: 'hidden',
        width: '50%',
      }}>
      <Text
        style={{
          fontSize: 20,
          color: isDarkTheme ? '#F4F6F4' : '#F7F9F7',
          fontWeight: '900',
        }}>
        Discover a World of Knowledge: Read Our Blogs Today
      </Text>
      <View
        style={{
          position: 'absolute',
          bottom: -180,
          left: 8,
          opacity: 1,
        }}>
        <OnlineArticle />
      </View>
      <Icon
        style={{
          position: 'absolute',
          fontSize: 13,
          color: isDarkTheme ? '#F4F6F4' : '#F7F9F7',
          opacity: 0.9,
          bottom: 10,
          right: 15,
        }}
        name="arrow-right"></Icon>
    </TouchableOpacity>
  );
};

export default ReadBlogsToday;

const styles = StyleSheet.create({});
