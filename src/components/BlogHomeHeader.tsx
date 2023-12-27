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
        position: 'absolute',
        backgroundColor: '#283e58',
        width: '110%',
        top: 0,
        right: 0,
        left: 0,
        height: 50,
        zIndex: 10,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
        <Icon
          style={{
            color: '#e9e9e9',
            fontSize: 26,
            fontWeight: '600',
          }}
          name="book"></Icon>
        <Text style={{color: '#e9e9e9'}}>Blog</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileScreen')}
        style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
        <Icon
          style={{
            color: '#e9e9e9',
            fontSize: 26,
            marginRight: 10,
            fontWeight: '600',
          }}
          name="user"></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default BlogHomeHeader;

const styles = StyleSheet.create({});
