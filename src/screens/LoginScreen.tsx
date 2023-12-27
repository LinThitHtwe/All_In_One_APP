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
      console.log('ERROR--', error);
      throw error;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#15212F',
        justifyContent: 'center',
        padding: 13,
      }}>
      <View
        style={{
          height: 430,
          backgroundColor: '#e9e9e9',
          width: '100%',
          borderRadius: 10,
          padding: 10,
          position: 'relative',
        }}>
        <Text
          style={{
            color: '#15212F',
            fontFamily: 'monospace',
            fontSize: 20,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          Login
        </Text>

        <View
          style={{
            marginTop: 10,
            justifyContent: 'center',
            height: '80%',
          }}>
          <CustomInput
            control={control}
            height={40}
            placeholder="example@email.com"
            inputType="email"
            label="Email"
            name="email"
          />

          <CustomInput
            control={control}
            height={40}
            placeholder="your password"
            inputType="email"
            label="Password"
            name="password"
          />
          <View style={{alignItems: 'center', marginTop: 40}}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: '#15212F',
                padding: 10,
                width: '40%',
                borderRadius: 10,
              }}>
              <Text style={{textAlign: 'center'}}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{paddingTop: 20}}
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={{color: '#15212F', borderBottomWidth: 1}}>
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
