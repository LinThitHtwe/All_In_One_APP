import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppSelector} from '../redux/app/hook';
type Props = {};

const ToWeatherForecast = (props: Props) => {
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isDarkTheme ? '#556B6D' : '#92A8AA',
        height: 70,
        borderRadius: 10,
        padding: 10,
        position: 'relative',
        overflow: 'hidden',
      }}>
      <Text
        style={{
          fontSize: 20,
          color: isDarkTheme ? '#F4F6F4' : '#F7F9F7',
          opacity: 1,
          fontWeight: '600',
          letterSpacing: -0.5,
        }}>
        Weather Forecast
      </Text>

      <Icon
        style={{
          position: 'absolute',
          fontSize: 13,
          color: isDarkTheme ? '#F4F6F4' : '#090B09',
          opacity: 0.4,
          bottom: 10,
          right: 15,
        }}
        name="arrow-right"></Icon>
      <Icon
        style={{
          position: 'absolute',
          fontSize: 50,
          color: isDarkTheme ? '#435653' : '#A9BCB9',
          top: -7,
          right: -8,
          opacity: 1,
          transform: [{rotate: '0deg'}],
        }}
        name="cloud"></Icon>
    </TouchableOpacity>
  );
};

export default ToWeatherForecast;

const styles = StyleSheet.create({});
