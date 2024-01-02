import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {storage} from '../../MMKV';
import {Alert} from 'react-native';
import React from 'react';
import {useAppSelector} from '../redux/app/hook';

export const useMiddleware = () => {
  const navigation = useNavigation();
  const user = useAppSelector(state => state.user.user);
  const test = storage.getString('loginuser');
  console.log('login-user--', user);
  useFocusEffect(
    React.useCallback(() => {
      // const loginUser = storage.getString('loginuser');

      if (!user) {
        Alert.alert('Login Required', 'Please log in to access this feature.', [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              navigation.navigate('HomeScreen');
            },
          },
          {
            text: 'Log In',
            onPress: () => {
              navigation.navigate('LoginScreen');
            },
          },
        ]);
      }

      return () => {
        // Cleanup code
      };
    }, []),
  );
};
