import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

type Props = {};

const CommentSection = (props: Props) => {
  return (
    <View style={{marginTop: 20, marginBottom: 90}}>
      <Text
        style={{
          color: '#15212F',
          fontFamily: 'monospace',
          marginVertical: 10,
        }}>
        Comments
      </Text>
      <View
        style={{
          backgroundColor: '#d3d3d3',
          padding: 10,
          borderRadius: 10,
          marginVertical: 6,
        }}>
        <Text style={{color: '#15212F'}}>LinThit : Very Goooood</Text>
      </View>

      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 25,
          padding: 10,
          borderColor: 'rgba(21, 33, 47, 0.4)',
        }}
        placeholder="Give Your Comment"
        placeholderTextColor={'rgba(21, 33, 47, 0.3)'}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 4,
        }}>
        <TouchableOpacity
          style={{backgroundColor: '#15212F', padding: 5, borderRadius: 10}}>
          <Text>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({});
