import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackScreenProps} from '../navigations/types';

interface Props extends RootStackScreenProps<'ToDoForm'> {}

const ToDoFrom = ({navigation}: Props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#15212F',
        justifyContent: 'center',
        padding: 13,
      }}>
      <View
        style={{
          height: 730,
          backgroundColor: '#e9e9e9',
          width: '100%',
          borderRadius: 10,
          padding: 10,
          position: 'relative',
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 15,
            left: 15,
            zIndex: 30,
            width: 50,
            height: 40,
          }}
          onPress={() => navigation.goBack()}>
          <Icon
            style={{
              color: '#15212F',
              fontSize: 18,
              fontWeight: '600',
            }}
            name="arrow-left"></Icon>
        </TouchableOpacity>
        <Text
          style={{
            color: '#15212F',
            fontSize: 25,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          Add Todo
        </Text>
      </View>
    </View>
  );
};

export default ToDoFrom;

const styles = StyleSheet.create({});
