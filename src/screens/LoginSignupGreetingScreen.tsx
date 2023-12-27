import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Circle, Path, Polygon, Rect} from 'react-native-svg';
import LoginSignupGreetingScreenSVG from '../svgs/LoginSignupGreetingScreenSVG';
type Props = {};

const LoginSignupGreetingScreen = (props: Props) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text
        style={{
          color: '#090B09',
          textAlign: 'center',
          fontSize: 26,
          fontWeight: '700',
        }}>
        Embark on the Blogging Odyssey
      </Text>
      <LoginSignupGreetingScreenSVG />
    </View>
  );
};

export default LoginSignupGreetingScreen;

const styles = StyleSheet.create({});
