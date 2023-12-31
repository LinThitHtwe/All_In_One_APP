import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const BottomNavigationBar = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderColor: '#719071',
        backgroundColor: '#F7F9F7',
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
      <TouchableOpacity style={{alignItems: 'center'}}>
        <Icon
          style={{
            color: '#92A8AA',
            fontSize: 28,
          }}
          name="home"></Icon>
        <Text style={{color: '#92A8AA', fontWeight: '900'}}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{alignItems: 'center'}}>
        <Icon
          style={{
            color: '#92A8AA',
            fontSize: 28,
          }}
          name="list-alt"></Icon>
        <Text style={{color: '#92A8AA', fontWeight: '900'}}>Blogs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={() => navigation.navigate('AddBlogFormScreen')}>
        <Icon
          style={{
            color: '#92A8AA',
            fontSize: 28,
          }}
          name="plus"></Icon>
        <Text style={{color: '#92A8AA', fontWeight: '900'}}>Post Blog</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{alignItems: 'center'}}>
        <Icon
          style={{
            color: '#92A8AA',
            fontSize: 26,
          }}
          name="list"></Icon>
        <Text style={{color: '#92A8AA', fontWeight: '900'}}>Setting</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigationBar;

const styles = StyleSheet.create({});
