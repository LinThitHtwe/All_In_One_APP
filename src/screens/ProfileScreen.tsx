import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useRegister} from '../hooks/useRegister';
import CustomInput from '../components/CustomInput';

type Props = {};

const ProfileScreen = (props: Props) => {
  const [isEditEnable, setIsEditEnable] = useState(false);
  const {control, handleSubmit} = useRegister();
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#15212F',
        justifyContent: 'center',
        padding: 13,
      }}>
      <Pressable
        onPress={Keyboard.dismiss}
        style={{width: '100%', position: 'relative'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#15212F',
            position: 'absolute',
            width: '18%',
            padding: 10,
            borderRadius: 10,
            top: 10,
            right: 10,
            zIndex: 10,
          }}>
          <Text style={{textAlign: 'center'}}>Logout</Text>
        </TouchableOpacity>
        <View
          style={{
            height: 740,
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
                    fontSize: 25,
                    color: '#15212F',
                    marginTop: 25,
                    marginBottom: 10,
                    fontWeight: '400',
                    fontFamily: 'monospace',
                  }}>
                  Username
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#15212F',
                    marginBottom: 10,
                    fontWeight: '400',
                    fontFamily: 'monospace',
                    marginLeft: 10,
                  }}>
                  JohnDoe
                </Text>

                <Text
                  style={{
                    fontSize: 25,
                    color: '#15212F',
                    marginTop: 25,
                    marginBottom: 10,
                    fontWeight: '400',
                    fontFamily: 'monospace',
                  }}>
                  Email
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#15212F',
                    marginBottom: 10,
                    fontWeight: '400',
                    fontFamily: 'monospace',
                    marginLeft: 10,
                  }}>
                  johndoe@johndoe.com
                </Text>
              </>
            )}

            {/* <Switch
              style={{height: 40}}
              trackColor={{false: '#15212F', true: '#3f6491'}}
              thumbColor={isEditEnable ? '#2f8cfa' : '#c7c7c7'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsEditEnable(!isEditEnable)}
              value={isEditEnable}
            /> */}
            {!isEditEnable && (
              <View style={{marginTop: 30, alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#15212F',
                    width: '50%',
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <Text>Edit Account</Text>
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
