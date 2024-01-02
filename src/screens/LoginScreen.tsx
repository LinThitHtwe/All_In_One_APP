import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import {useLogin} from '../hooks/useLogin';
import {login, register} from '../api/apiFunctions';
import {RootStackScreenProps} from '../navigations/types';
import {SubmitHandler} from 'react-hook-form';
import {storage} from '../../MMKV';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch, useAppSelector} from '../redux/app/hook';
import {actions as userActions} from '../redux/features/user/userSlice';

interface Props extends RootStackScreenProps<'LoginScreen'> {}
type RegisterFormValues = {
  email: string;
  password: string;
};
type RegisterScreenSubmit = SubmitHandler<RegisterFormValues>;

const LoginScreen = ({navigation}: Props) => {
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  const [isLoginError, setIsLoginError] = useState(false);
  const dispatch = useAppDispatch();
  const {control, handleSubmit} = useLogin();

  const onSubmit: RegisterScreenSubmit = async data => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        setIsLoginError(true);
        dispatch(userActions.clearUser());
        return;
      }
      dispatch(userActions.setUser(response.data?.data));
      setIsLoginError(false);
      navigation.navigate('HomeScreen');
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: isDarkTheme ? '#070907' : '#F7F9F7',
        justifyContent: 'center',
        padding: 13,
        position: 'relative',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 23,
          left: 23,
          zIndex: 10,
        }}>
        <Icon
          style={{
            fontSize: 23,
            color: '#F7F9F7',
            opacity: 0.8,
          }}
          name="arrow-left"></Icon>
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          height: 350,
          width: 350,
          backgroundColor: isDarkTheme ? '#708F70' : '#719071',
          top: -180,
          left: -160,
          borderRadius: 130,
          transform: [{rotate: '35deg'}],
          opacity: 0.9,
        }}></View>

      <View
        style={{
          position: 'absolute',
          height: 370,
          width: 370,
          backgroundColor: isDarkTheme ? '#708F70' : '#719071',
          bottom: -260,
          right: 10,
          borderRadius: 120,
          transform: [{rotate: '35deg'}],
          opacity: 0.9,
        }}></View>

      <View
        style={{
          height: 410,
          width: '100%',
          borderRadius: 10,
          padding: 10,
          position: 'relative',
        }}>
        <Text
          style={{
            color: isDarkTheme ? '#F4F6F4' : '#080A08',
            fontSize: 30,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          Login
        </Text>

        <View
          style={{
            justifyContent: 'center',
            height: '80%',
          }}>
          <CustomInput
            control={control}
            height={45}
            placeholder="example@email.com"
            inputType="email"
            label="Email"
            name="email"
          />

          <CustomInput
            control={control}
            height={45}
            placeholder="your password"
            inputType="email"
            label="Password"
            name="password"
          />

          {isLoginError && (
            <Text
              style={{
                color: '#ff0000',
                textAlign: 'center',
                marginTop: 20,
                fontSize: 16,
                letterSpacing: 3,
              }}>
              Login Failed
            </Text>
          )}
          <View style={{alignItems: 'center', marginTop: 40}}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: isDarkTheme ? '#708F70' : '#719071',
                padding: 13,
                width: '90%',
                borderRadius: 20,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#F7F9F7',
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{paddingTop: 40}}
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text
                style={{
                  color: isDarkTheme ? '#435653' : '#AABDBA',
                  borderBottomWidth: 1,
                  borderColor: isDarkTheme ? '#435653' : '#AABDBA',
                }}>
                Don't have an account? Sign up here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
