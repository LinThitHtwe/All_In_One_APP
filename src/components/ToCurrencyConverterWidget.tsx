import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamsList} from '../navigations/types';

type Props = {};
type NavigationProps<T extends keyof RootStackParamsList> = {
  navigation: {
    navigate: (screen: T) => void;
  };
};
const ToCurrencyConverterWidget = (props: Props) => {
  const navigation = useNavigation<NavigationProps<'CurrencyConverter'>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CurrencyConverter')}
      style={{
        backgroundColor: '#212D3B',
        height: 65,
        width: 180,
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden',
      }}>
      <Text
        style={{
          color: '#e9e9e9',
          fontSize: 18,
          fontWeight: '700',
          fontFamily: 'monospace',
        }}>
        Currency Converter
      </Text>
      <Icon
        style={{
          position: 'absolute',
          fontSize: 13,
          color: '#e9e9e9',
          bottom: 10,
          right: 15,
        }}
        name="arrow-right"></Icon>
      <Icon
        style={{
          position: 'absolute',
          fontSize: 90,
          color: '#888',
          top: 10,
          left: -10,
          opacity: 0.1,
          transform: [{rotate: '15deg'}],
        }}
        name="money"></Icon>

      <Icon
        style={{
          position: 'absolute',
          fontSize: 90,
          color: '#888',
          top: -45,
          right: -30,
          opacity: 0.1,
          transform: [{rotate: '15deg'}],
        }}
        name="money"></Icon>
    </TouchableOpacity>
  );
};

export default ToCurrencyConverterWidget;

const styles = StyleSheet.create({});
