import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomInput from '../components/CustomInput';
import {useLogin} from '../hooks/useLogin';
import {login, register} from '../api/apiFunctions';
import {RootStackScreenProps} from '../navigations/types';
import {SubmitHandler} from 'react-hook-form';
import {storage} from '../../MMKV';

interface Props extends RootStackScreenProps<'LoginScreen'> {}
type RegisterFormValues = {
  email: string;
  password: string;
};
type RegisterScreenSubmit = SubmitHandler<RegisterFormValues>;

const LoginScreen = ({navigation}: Props) => {
  const {control, handleSubmit} = useLogin();

  const onSubmit: RegisterScreenSubmit = async data => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });
      storage.set('loginuser', JSON.stringify(response.data));
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
        backgroundColor: '#F7F9F7',
        justifyContent: 'center',
        padding: 13,
        position: 'relative',
      }}>
      <View
        style={{
          position: 'absolute',
          height: 350,
          width: 350,
          backgroundColor: '#719071',
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
          backgroundColor: '#719071',
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
            color: '#080A08',
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
          <View style={{alignItems: 'center', marginTop: 40}}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: '#719071',
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
                  color: '#AABDBA',
                  borderBottomWidth: 1,
                  borderColor: '#AABDBA',
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
