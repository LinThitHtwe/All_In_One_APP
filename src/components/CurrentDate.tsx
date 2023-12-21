import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {};

const getCurrentDate = () => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.toLocaleDateString('en-US', {weekday: 'short'});
  const dayOfMonth = currentDate.getDate();
  const month = currentDate.toLocaleDateString('en-US', {month: 'long'});
  const year = currentDate.getFullYear();

  return {dayOfWeek, dayOfMonth, month, year};
};

const CurrentDate = (props: Props) => {
  const {dayOfWeek, dayOfMonth, month, year} = getCurrentDate();
  return (
    <View
      style={{
        backgroundColor: '#212D3B',
        height: 150,
        width: 150,
        borderRadius: 20,
        shadowColor: '#000000',
        elevation: 5,
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}>
        <Text
          style={{
            fontSize: 40,
            color: '#e9e9e9',
            fontFamily: 'monospace',
            fontWeight: '900',
          }}>
          {dayOfMonth}
        </Text>

        <Text
          style={{
            fontSize: 30,
            color: '#e9e9e9',
            fontFamily: 'monospace',
          }}>
          {dayOfWeek}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 18,
          color: '#e9e9e9',
          fontFamily: 'monospace',
          marginVertical: 10,
        }}>
        {month}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: '#e9e9e9',
          fontFamily: 'monospace',
          marginVertical: 3,
        }}>
        {year}
      </Text>

      <Icon
        style={{
          position: 'absolute',
          fontSize: 90,
          color: '#888',
          bottom: 10,
          right: -10,
          opacity: 0.1,
          transform: [{rotate: '15deg'}],
        }}
        name="calendar-o"></Icon>
    </View>
  );
};

export default CurrentDate;

const styles = StyleSheet.create({});
