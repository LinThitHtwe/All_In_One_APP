import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/app/hook';
import {actions as userActions} from '../redux/features/user/userSlice';

type Props = {};

const BlogHomeHeader = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  const user = useAppSelector(state => state.user.user);
  const handleLogout = () => {
    dispatch(userActions.clearUser());
    navigation.navigate('HomeScreen');
    ToastAndroid.show(`Logout Successful`, ToastAndroid.LONG);
  };
  return (
    <View
      style={{
        height: 60,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
      }}>
      <Icon
        style={{
          color: isDarkTheme ? '#708F70' : '#719071',
          fontSize: 26,
          fontWeight: '600',
        }}
        name="book"></Icon>
      {user ? (
        <TouchableOpacity onPress={handleLogout}>
          <Text
            style={{
              color: isDarkTheme ? '#708F70' : '#719071',
              fontSize: 20,
              fontWeight: '700',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginSignupGreetingScreen')}>
          <Text
            style={{
              color: isDarkTheme ? '#708F70' : '#719071',
              fontSize: 20,
              fontWeight: '700',
            }}>
            Login
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BlogHomeHeader;

const styles = StyleSheet.create({});
