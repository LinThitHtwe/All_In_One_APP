import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {storage} from '../../MMKV';
import {Alert} from 'react-native';
import React from 'react';

export const useMiddleware = () => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const loginUser = storage.getString('loginuser');

      if (!loginUser) {
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
