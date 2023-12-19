import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CurrentDate from '../components/CurrentDate';
//import  from 'react-native-vector-icons';
type Props = {};

const HomeScreen = (props: Props) => {
  const [marginTop, setMarginTop] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = event => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY > scrollY) {
      // Scrolling down
      // setScrollDirection('down');
      setMarginTop(prevMarginTop => prevMarginTop - 10);
    } else {
      setMarginTop(prevMarginTop => Math.min(0, prevMarginTop + 10));
    }

    setScrollY(currentScrollY);
  };
  //console.log('margintop--', marginTop);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#15212F',
      }}>
      <View
        style={{
          backgroundColor: '#15212F',
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
              color: '#F5F6FA',
              fontFamily: 'monospace',
            }}>
            Yangon
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 35,
              color: '#F5F6FA',
              fontFamily: 'monospace',
            }}>
            26°C
          </Text>
        </View>
      </View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={2}
        style={{
          backgroundColor: '#d1d1d1',
          height: '150%',
          borderRadius: 23,
          padding: 3,
          position: 'relative',
          marginBottom: 2,
          marginTop: marginTop,
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
            <View
              style={{
                backgroundColor: '#212D3B',
                height: 65,
                width: 180,
                borderRadius: 10,
              }}></View>
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
                  height: 70,
                  width: '100%',
                  borderRadius: 10,
                  marginVertical: 10,
                  padding: 10,
                }}>
                <Text style={{fontSize: 20, color: '#d1d1d1'}}>Hello</Text>
              </View>
            ))}
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
          }}>
          <View
            style={{
              height: 90,
              backgroundColor: '#eee',
              width: '95%',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderColor: '#2E5F66',

              alignItems: 'center',
              marginBottom: 1,
            }}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
