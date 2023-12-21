import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CurrentDate from '../components/CurrentDate';
import {RootStackScreenProps} from '../navigations/types';
import BottomNavigationBar from '../components/BottomNavigationBar';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props extends RootStackScreenProps<'HomeScreen'> {}

const HomeScreen = ({navigation}: Props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#15212F',
      }}>
      <View
        style={{
          width: '100%',
          height: 170,
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 30,
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: 'https://cdn1.iconfinder.com/data/icons/weather-forecast-meteorology-color-1/128/weather-sunny-512.png',
          }}
          style={{height: 110, width: 110}}
        />
        <View style={{gap: 15}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 40,
              color: '#e9e9e9',
              fontFamily: 'monospace',
            }}>
            Yangon
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 35,
              color: '#e9e9e9',
              fontFamily: 'monospace',
            }}>
            26°C
          </Text>
        </View>
      </View>
      <ScrollView
        style={{
          backgroundColor: '#e9e9e9',
          height: '150%',
          borderRadius: 23,
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
          <CurrentDate />
          <View style={{justifyContent: 'space-around'}}>
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
            <View
              style={{
                backgroundColor: '#212D3B',
                height: 65,
                width: 180,
                borderRadius: 10,
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
              height: 370,
              width: '95%',
              marginVertical: 30,
              borderRadius: 20,

              padding: 5,
            }}>
            {[...Array(4).keys()].map(index => (
              <View
                key={index}
                style={{
                  backgroundColor: '#212D3B',
                  height: 60,
                  width: '100%',
                  borderRadius: 10,
                  marginVertical: 10,
                  padding: 10,
                }}>
                <Text style={{fontSize: 20, color: '#e9e9e9'}}>Hello</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <BottomNavigationBar />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
