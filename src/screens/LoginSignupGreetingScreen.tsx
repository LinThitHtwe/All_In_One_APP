import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LoginSignupGreetingScreenSVG from '../svgs/LoginSignupGreetingScreenSVG';
import {RootStackScreenProps} from '../navigations/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppSelector} from '../redux/app/hook';

interface Props extends RootStackScreenProps<'LoginSignupGreetingScreen'> {}

const LoginSignupGreetingScreen = ({navigation}: Props) => {
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        backgroundColor: isDarkTheme ? '#070907' : '#F4F6F4',
        position: 'relative',
      }}>
      <Text
        style={{
          color: isDarkTheme ? '#708F70' : '#719071',
          textAlign: 'center',
          fontSize: 26,
          fontWeight: '800',
          marginTop: 20,
          marginBottom: 25,
        }}>
        Login for Blog Posting
      </Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 25,
          left: 16,
        }}>
        <Icon
          style={{
            fontSize: 23,
            color: '#708F70',
            opacity: 0.8,
          }}
          name="arrow-left"></Icon>
      </TouchableOpacity>
      <LoginSignupGreetingScreenSVG />

      <View
        style={{
          padding: 10,
          marginTop: 30,
          width: '100%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={{
            backgroundColor: '#708F70',
            width: '80%',
            padding: 14,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#F6F8F6',
              fontSize: 19,
              fontWeight: '700',
              textAlign: 'center',
              letterSpacing: -0.2,
            }}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterScreen')}
          style={{
            borderWidth: 1,
            borderColor: isDarkTheme ? '##435653' : 'rgba(169, 188, 185,1)',
            width: '80%',
            padding: 14,
            borderRadius: 10,
            marginTop: 18,
          }}>
          <Text
            style={{
              color: '#708F70',
              fontSize: 19,
              fontWeight: '700',
              textAlign: 'center',
              letterSpacing: -0.2,
              opacity: 0.8,
            }}>
            Create account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginSignupGreetingScreen;

const styles = StyleSheet.create({});
