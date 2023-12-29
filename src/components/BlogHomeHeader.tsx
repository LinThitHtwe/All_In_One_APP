import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const BlogHomeHeader = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 60,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
      }}>
      <Icon
        style={{
          color: '#719071',
          fontSize: 26,
          fontWeight: '600',
        }}
        name="book"></Icon>
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginSignupGreetingScreen')}>
        <Text style={{color: '#719071', fontSize: 20, fontWeight: '700'}}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BlogHomeHeader;

const styles = StyleSheet.create({});
