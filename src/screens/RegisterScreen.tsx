import {
  StyleSheet,
  Text,
  ToastAndroid,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {register} from '../api/apiFunctions';
import {useRegister} from '../hooks/useRegister';
import {RootStackScreenProps} from '../navigations/types';
import {SubmitHandler} from 'react-hook-form';
import {useAppSelector} from '../redux/app/hook';

interface Props extends RootStackScreenProps<'RegisterScreen'> {}
type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};
type RegisterScreenSubmit = SubmitHandler<RegisterFormValues>;

const RegisterScreen = ({navigation}: Props) => {
  const {control, handleSubmit} = useRegister();
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  const [isRegisterError, setIsRegisterError] = useState(false);

  const onSubmit: RegisterScreenSubmit = async data => {
    try {
      const response = await register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (response.error) {
        ToastAndroid.show(`Register Failed`, ToastAndroid.LONG);
        setIsRegisterError(true);
        return;
      }
      navigation.navigate('HomeScreen');
      ToastAndroid.show(`Register Successful`, ToastAndroid.LONG);
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
          top: -260,
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
          bottom: -280,
          right: -20,
          borderRadius: 120,
          transform: [{rotate: '35deg'}],
          opacity: 0.9,
        }}></View>
      <View
        style={{
          height: 640,
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
          Register
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
            placeholder="John Doe"
            inputType="text"
            label="Username"
            name="name"
          />
          <CustomInput
            control={control}
            height={40}
            placeholder="example@email.com"
            inputType="email"
            label="Email"
            name="email"
          />
          {isRegisterError && (
            <Text
              style={{
                color: '#ff0000',
                textAlign: 'center',
                marginTop: 20,
                fontSize: 16,
                letterSpacing: 3,
              }}>
              Email Already Exist
            </Text>
          )}
          <CustomInput
            control={control}
            height={40}
            placeholder="your password"
            inputType="email"
            label="Password"
            name="password"
          />

          <CustomInput
            control={control}
            height={40}
            placeholder="cofirm password"
            inputType="text"
            label="Confirm Password"
            name="confirmPassword"
          />
          <View style={{alignItems: 'center', marginTop: 40}}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: '#708F70',
                padding: 13,
                width: '90%',
                borderRadius: 25,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '700',
                  color: '#F7F9F7',
                  fontSize: 18,
                }}>
                Register
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{paddingTop: 20}}
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text
                style={{
                  color: isDarkTheme ? '#435653' : '#AABDBA',
                  borderBottomWidth: 1,
                  borderColor: isDarkTheme ? '#435653' : '#AABDBA',
                }}>
                Already have an account? Login Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
