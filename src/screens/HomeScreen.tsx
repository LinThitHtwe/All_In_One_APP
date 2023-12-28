import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RootStackScreenProps} from '../navigations/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToCurrencyConverterWidget from '../components/ToCurrencyConverterWidget';
import ToWeatherForecast from '../components/ToWeatherForecast';
import ReadBlogsToday from '../components/ReadBlogsToday';

interface Props extends RootStackScreenProps<'HomeScreen'> {}

const HomeScreen = ({navigation}: Props) => {
  // const handleDeleteData = async () => {
  //   try {
  //     // Replace 'todos' with the key you used to store your data
  //     await AsyncStorage.removeItem('todos');
  //     console.log('Data deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting data:', error);
  //   }
  // };

  // handleDeleteData();
  return (
    <View style={{backgroundColor: '#F7F9F7', flex: 1}}>
      <View
        style={{
          height: 60,
          borderBottomEndRadius: 5,
          borderBottomStartRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <Icon
          style={{
            color: '#719071',
            fontSize: 26,
            fontWeight: '600',
          }}
          name="book"></Icon>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginSignupGreetingScreen')}>
          <Text style={{color: '#719071', fontSize: 20, fontWeight: '700'}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{width: '100%'}}>
        <View
          style={{
            padding: 10,
            marginTop: 0,
            height: 'auto',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '95%',
              marginBottom: 6,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#090B09',
                fontSize: 16,
                fontWeight: '500',
              }}>
              Read Latest Blog{' '}
            </Text>
            <Icon
              style={{
                color: '#090B09',
                fontSize: 13,
                marginTop: 3,
                marginLeft: 5,
              }}
              name="arrow-down"></Icon>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#F7F9F7',
              borderTopStartRadius: 60,
              borderTopEndRadius: 60,
              borderBottomStartRadius: 30,
              borderBottomEndRadius: 30,
              height: 420,
              width: 350,
              shadowColor: '#719071',
              elevation: 15,
              shadowOffset: {width: 20, height: 20},
              shadowOpacity: 1,
              shadowRadius: 9,
              borderColor: 'rgba(113, 144, 113,0.1)',
              borderWidth: 1,
              overflow: 'hidden',
              position: 'relative',
            }}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1602300991431-27a957a5bcf7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGdyZWVufGVufDB8fDB8fHww',
              }}
              style={{
                height: '83%',
                width: '100%',
                borderTopLeftRadius: 60,
                borderTopRightRadius: 60,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            />
            <View
              style={{
                backgroundColor: 'rgba(247, 249, 247,1)',
                justifyContent: 'center',
                padding: 8,
                height: '17%',
                bottom: 0,
                zIndex: 10,
                right: 0,
                left: 0,
                width: 350,
              }}>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 22,
                  color: '#080A08',
                  fontWeight: '700',
                  letterSpacing: 3,
                  fontFamily: 'System',
                  textAlign: 'center',
                  lineHeight: 30,
                }}>
                The Importance of Sleep
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 'auto',
              width: '103%',
              marginTop: 25,
              padding: 0,
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginBottom: 20,
              position: 'relative',
            }}>
            <ReadBlogsToday />

            <View style={{width: '40%', justifyContent: 'space-between'}}>
              <ToCurrencyConverterWidget />
              <ToWeatherForecast />
            </View>
          </View>
          {Array.from({length: 3}, (_, index) => (
            <View
              key={index}
              style={{
                height: 60,
                marginVertical: 5,
                width: '100%',
                borderRadius: 10,
                backgroundColor: '#719071',
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F9FCF9',
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
    color: '#F7F9F7',
  },

  weatherTemperature: {
    textAlign: 'center',
    fontSize: 35,
    color: '#F7F9F7',
  },

  scrollContainer: {
    backgroundColor: '#719071',
    height: '150%',
    borderRadius: 23,
    padding: 3,
    position: 'relative',
    marginBottom: 2,
  },
});
