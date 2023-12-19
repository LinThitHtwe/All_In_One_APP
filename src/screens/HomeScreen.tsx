import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2e5f66',
      }}>
      <View
        style={{
          backgroundColor: '#2e5f66',
          width: '100%',
          height: 190,
          opacity: 0.8,
        }}></View>
      <ScrollView
        style={{
          backgroundColor: '#f8fcfc',
          height: '130%',
          borderRadius: 23,
          marginTop: -30,
          padding: 3,
          position: 'relative',
          marginBottom: 2,
        }}>
        <View
          style={{
            height: 150,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 13,
          }}>
          <View
            style={{
              backgroundColor: '#2e5f66',
              height: 150,
              width: 150,
              borderRadius: 20,
              opacity: 0.8,
            }}></View>
          <View style={{justifyContent: 'space-around'}}>
            <View
              style={{
                backgroundColor: '#8b99cb',
                height: 65,
                width: 180,
                borderRadius: 10,
              }}></View>
            <View
              style={{
                backgroundColor: '#424894',
                height: 65,
                width: 180,
                borderRadius: 15,
                opacity: 0.9,
              }}></View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              borderColor: '#2E5F66',
              height: 370,
              width: '95%',
              marginVertical: 30,
              borderRadius: 20,
              opacity: 0.9,
              padding: 5,
            }}>
            {[...Array(4).keys()].map(index => (
              <View
                key={index}
                style={{
                  backgroundColor: '#2E5F66',
                  height: 70,
                  width: '100%',
                  borderRadius: 10,
                  marginVertical: 10,
                  opacity: 0.9,
                }}
              />
            ))}
          </View>
        </View>
        <View
          style={{
            height: 60,
            backgroundColor: '#8B99CB',
            width: '100%',
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
            borderColor: '#2E5F66',

            alignItems: 'center',
            marginBottom: 1,
          }}></View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
