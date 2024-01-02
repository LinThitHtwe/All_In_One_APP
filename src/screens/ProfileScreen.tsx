import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useRegister} from '../hooks/useRegister';
import CustomInput from '../components/CustomInput';
import {useAppDispatch, useAppSelector} from '../redux/app/hook';
import {actions as userActions} from '../redux/features/user/userSlice';
import {RootStackScreenProps} from '../navigations/types';

interface Props extends RootStackScreenProps<'ProfileScreen'> {}

const ProfileScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [isEditEnable, setIsEditEnable] = useState(false);
  const {control, handleSubmit} = useRegister({});
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  const user = useAppSelector(state => state.user.user);

  const handleLogout = () => {
    dispatch(userActions.clearUser());
    navigation.navigate('BlogHomeScreen');
    ToastAndroid.show(`Logout Successful`, ToastAndroid.LONG);
  };
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: isDarkTheme ? '#070907' : '#F4F6F4',
        justifyContent: 'center',
        padding: 13,
      }}>
      <Pressable
        onPress={Keyboard.dismiss}
        style={{width: '100%', position: 'relative'}}>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            position: 'absolute',
            width: '18%',
            padding: 10,
            borderRadius: 10,
            top: 40,
            right: 10,
            zIndex: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '600',
              color: isDarkTheme ? '#556B6D' : '#92A8AA',
              fontSize: 14,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
        <View
          style={{
            height: 740,
            width: '100%',
            borderRadius: 10,
            padding: 10,
            position: 'relative',
          }}>
          <Text
            style={{
              color: isDarkTheme ? '#F4F6F4' : '#070907',

              textAlign: 'center',
              fontSize: 25,
            }}>
            Profile
          </Text>

          <View style={{marginTop: 30}}>
            {isEditEnable ? (
              <>
                <CustomInput
                  control={control}
                  height={45}
                  inputType="text"
                  label="Username"
                  name="name"
                  placeholder="John Doe"
                />
                <CustomInput
                  control={control}
                  height={45}
                  inputType="email"
                  label="Email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                />
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 23,
                    color: isDarkTheme ? '#F4F6F4' : '#070907',
                    marginTop: 25,
                    marginBottom: 10,
                    fontWeight: '400',
                  }}>
                  Username
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: isDarkTheme ? '#F4F6F4' : '#070907',
                    marginBottom: 10,
                    fontWeight: '400',

                    marginLeft: 10,
                  }}>
                  JohnDoe
                </Text>

                <Text
                  style={{
                    fontSize: 23,
                    color: isDarkTheme ? '#F4F6F4' : '#070907',
                    marginTop: 25,
                    marginBottom: 10,
                    fontWeight: '400',
                  }}>
                  Email
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: isDarkTheme ? '#F4F6F4' : '#070907',
                    marginBottom: 10,
                    fontWeight: '400',

                    marginLeft: 10,
                  }}>
                  johndoe@johndoe.com
                </Text>
              </>
            )}
            {!isEditEnable ? (
              <View style={{marginTop: 30, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => setIsEditEnable(true)}
                  style={{
                    backgroundColor: isDarkTheme ? '#708F70' : '#719071',
                    width: '50%',
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: isDarkTheme ? '#F4F6F4' : '#F4F6F4',
                      fontSize: 18,
                      fontWeight: '700',
                      textAlign: 'center',
                    }}>
                    Edit Account
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  marginTop: 30,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  onPress={() => setIsEditEnable(false)}
                  style={{
                    backgroundColor: isDarkTheme ? '#435653' : '#A9BCB9',
                    padding: 10,
                    borderRadius: 10,
                    width: '30%',
                  }}>
                  <Text
                    style={{
                      color: '#F4F6F4',
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: isDarkTheme ? '#708F70' : '#719071',
                    padding: 10,
                    borderRadius: 10,
                    width: '30%',
                  }}>
                  <Text
                    style={{
                      color: '#F4F6F4',
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    Update
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
