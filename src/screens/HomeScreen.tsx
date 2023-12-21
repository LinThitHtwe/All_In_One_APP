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
import ToCurrencyConverterWidget from '../components/ToCurrencyConverterWidget';

interface Props extends RootStackScreenProps<'HomeScreen'> {}

const HomeScreen = ({navigation}: Props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.weatherContainer}>
        <Image
          source={{
            uri: 'https://cdn1.iconfinder.com/data/icons/weather-forecast-meteorology-color-1/128/weather-sunny-512.png',
          }}
          style={styles.weatherImage}
        />
        <View style={{gap: 15}}>
          <Text style={styles.weatherCityText}>Yangon</Text>
          <Text style={styles.weatherTemperature}>26°C</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View
          style={{
            height: 150,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 13,
          }}>
          <CurrentDate />
          <View style={{justifyContent: 'space-around'}}>
            <ToCurrencyConverterWidget />
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
              marginVertical: 15,
              borderRadius: 20,

              padding: 5,
            }}>
            <Text
              style={{
                color: '#15212F',
                fontSize: 17,
                fontWeight: '500',
                fontFamily: 'monospace',
              }}>
              Your Todos
            </Text>
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
                <Text
                  style={{
                    fontSize: 20,
                    color: '#e9e9e9',
                    fontFamily: 'monospace',
                  }}>
                  Hello
                </Text>
              </View>
            ))}
            <TouchableOpacity
              onPress={() => navigation.navigate('AllToDosList')}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 8,
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  color: '#15212F',
                  fontWeight: '500',
                  borderColor: 'rgba(21, 33, 47,0.8)',
                  borderBottomWidth: 1,
                  fontFamily: 'monospace',
                }}>
                Show All
              </Text>
              <Icon
                style={{
                  fontSize: 15,
                  color: '#15212F',
                }}
                name="arrow-right"></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomNavigationBar />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#15212F',
  },
  weatherContainer: {
    width: '100%',
    height: 170,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  weatherImage: {height: 110, width: 110},

  weatherCityText: {
    textAlign: 'center',
    fontSize: 40,
    color: '#e9e9e9',
    fontFamily: 'monospace',
  },

  weatherTemperature: {
    textAlign: 'center',
    fontSize: 35,
    color: '#e9e9e9',
    fontFamily: 'monospace',
  },

  scrollContainer: {
    backgroundColor: '#e9e9e9',
    height: '150%',
    borderRadius: 23,
    padding: 3,
    position: 'relative',
    marginBottom: 2,
  },
});
