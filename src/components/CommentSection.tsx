import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useAppSelector} from '../redux/app/hook';
import {Controller} from 'react-hook-form';
import {useComment} from '../hooks/useComment';
import {useNavigation} from '@react-navigation/native';
import {postComment} from '../api/apiFunctions';

type Props = {};

const CommentSection = (props: Props) => {
  const navigation = useNavigation();
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  const loginUser = useAppSelector(state => state.user.user);
  const {control, handleSubmit} = useComment();

  const onSubmit = async data => {
    if (!loginUser) {
      Alert.alert('Login Required', 'Please log in to access this feature.', [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            // navigation.navigate('HomeScreen');
          },
        },
        {
          text: 'Log In',
          onPress: () => {
            navigation.navigate('LoginScreen');
          },
        },
      ]);
      return;
    }

    postComment({
      ...data,
      blog: '65943d69ef270d6e21cf261b',
      user: loginUser.user._id,
    })
      .then(response => {
        console.log('Comment added successfully:', response);
      })
      .catch(error => {
        console.error('Error adding comment:', error.message);
      });
  };
  return (
    <View style={{marginTop: 20, marginBottom: 90}}>
      <Text
        style={{
          color: isDarkTheme ? '#F4F6F4' : '#080A08',

          marginVertical: 10,
        }}>
        Comments (1)
      </Text>
      <View>
        <View
          style={{
            backgroundColor: isDarkTheme
              ? 'rgba(244, 246, 244,0.2)'
              : 'rgba(170, 189, 186,0.1)',
            padding: 13,
            borderRadius: 10,
            marginVertical: 6,
          }}>
          <Text
            style={{
              color: isDarkTheme ? '#F4F6F4' : '#080A08',
              fontSize: 15,
              fontWeight: '400',
            }}>
            LinThit : Very Goooood
          </Text>
        </View>
        <Text
          style={{
            color: isDarkTheme ? '#F4F6F4' : '#080A08',
            fontSize: 10,
            textAlign: 'right',
          }}>
          1 min ago
        </Text>
      </View>
      <Controller
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
            <TextInput
              name="comment"
              control={control}
              value={value}
              onChangeText={text => onChange(text)}
              onBlur={onBlur}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 25,
                padding: 10,
                borderColor: isDarkTheme
                  ? 'rgba(244, 246, 244, 0.2)'
                  : 'rgba(21, 33, 47, 0.4)',
                color: isDarkTheme ? '#F4F6F4' : '#070907',
              }}
              placeholder="Give Your Comment"
              placeholderTextColor={
                isDarkTheme
                  ? 'rgba(244, 246, 244, 0.5)'
                  : 'rgba(21, 33, 47, 0.4)'
              }
            />
            {error && (
              <Text style={{color: '#FF0000', fontSize: 12}}>
                {error.message}
              </Text>
            )}
          </>
        )}
        name="comment"
        control={control}
        rules={{required: 'Comment is required'}}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 4,
        }}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{backgroundColor: '#719071', padding: 10, borderRadius: 10}}>
          <Text style={{color: '#F7F9F7', fontWeight: '600'}}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({});
