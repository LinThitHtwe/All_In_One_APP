import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const BottomNavigationBar = (props: Props) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: 50,
          backgroundColor: '#283e58',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          width: '93%',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderColor: '#2E5F66',
          alignItems: 'center',
          marginBottom: 1,
          overflow: 'hidden',
        }}>
        <View
          style={{
            backgroundColor: '#355578',
            borderTopRightRadius: 40,
            borderBottomRightRadius: 30,
            height: '100%',
            width: '30%',
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center', fontFamily: 'monospace'}}>
            Home
          </Text>
        </View>
        <View style={{height: '100%', width: '30%', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontFamily: 'monospace'}}>
            Home
          </Text>
        </View>
        <View style={{height: '100%', width: '30%', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontFamily: 'monospace'}}>
            Home
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BottomNavigationBar;

const styles = StyleSheet.create({});
