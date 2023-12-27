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
        backgroundColor: '#AABDBA',
        height: 70,
        borderRadius: 10,
        padding: 10,
        position: 'relative',
        overflow: 'hidden',
      }}>
      <Text
        style={{
          fontSize: 20,
          color: '#090B09',
          opacity: 0.4,
          fontWeight: '600',
          letterSpacing: -0.5,
        }}>
        Currency Converter
      </Text>

      <Icon
        style={{
          position: 'absolute',
          fontSize: 13,
          color: '#090B09',
          opacity: 0.4,
          bottom: 10,
          right: 15,
        }}
        name="arrow-right"></Icon>
      <Icon
        style={{
          position: 'absolute',
          fontSize: 70,
          color: '#708F70',
          top: -26,
          right: -28,
          opacity: 0.8,
          transform: [{rotate: '45deg'}],
        }}
        name="money"></Icon>
    </TouchableOpacity>
  );
};

export default ToCurrencyConverterWidget;

const styles = StyleSheet.create({});
