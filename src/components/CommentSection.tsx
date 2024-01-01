import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useAppSelector} from '../redux/app/hook';

type Props = {};

const CommentSection = (props: Props) => {
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
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

      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 25,
          padding: 10,
          borderColor: isDarkTheme
            ? 'rgba(244, 246, 244,0.2)'
            : 'rgba(21, 33, 47, 0.4)',
        }}
        placeholder="Give Your Comment"
        placeholderTextColor={
          isDarkTheme ? 'rgba(244, 246, 244,0.5)' : 'rgba(21, 33, 47, 0.4)'
        }
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 4,
        }}>
        <TouchableOpacity
          style={{backgroundColor: '#719071', padding: 10, borderRadius: 10}}>
          <Text style={{color: '#F7F9F7', fontWeight: '600'}}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({});
