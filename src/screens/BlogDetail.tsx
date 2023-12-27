import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CommentSection from '../components/CommentSection';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackScreenProps} from '../navigations/types';
import useFetchData from '../hooks/useFetchData';
import {getBlogById} from '../api/apiFunctions';
import {formatDistanceToNow} from 'date-fns';

interface Props extends RootStackScreenProps<'BlogDetail'> {}

const BlogDetail = ({route, navigation}: Props) => {
  const {blogId} = route.params;
  const {data: blogData, isLoading} = useFetchData([`blog${blogId}`], () =>
    getBlogById(blogId),
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#15212F',
        justifyContent: 'center',
        padding: 13,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%',
          position: 'absolute',
          top: 30,
          left: 20,
          zIndex: 20,
        }}
        onPress={() => navigation.goBack()}>
        <Icon
          style={{
            color: '#15212F',
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 8,
          }}
          name="arrow-left"></Icon>
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
        <ScrollView style={{width: '100%'}}>
          <Text
            style={{
              fontFamily: 'monospace',
              textAlign: 'center',
              color: '#15212F',
              fontSize: 23,
            }}>
            {blogData?.title}
            {isLoading && 'Loading'}
          </Text>
          <View style={{padding: 10, marginTop: 30}}>
            <Image
              source={{
                uri: blogData?.picture
                  ? `data:image/jpeg;base64,${blogData?.picture}`
                  : 'https://plus.unsplash.com/premium_photo-1681487807762-98fbe8a9db5e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              style={{height: 260, width: '100%', borderRadius: 10}}
            />
            <View style={{padding: 6}}>
              <Text
                style={{
                  color: '#15212F',
                  fontFamily: 'monospace',
                  fontWeight: '700',
                  marginTop: 15,
                  fontSize: 20,
                }}>
                {blogData?.title}
                {isLoading && 'Loading'}
              </Text>
              <Text
                style={{
                  color: '#15212F',
                  fontFamily: 'monospace',
                  fontSize: 12,
                  paddingLeft: 6,
                  marginTop: 5,
                  fontWeight: '800',
                }}>
                {blogData?.updatedAt
                  ? `Ivan (${formatDistanceToNow(new Date(blogData.updatedAt), {
                      addSuffix: true,
                    })})`
                  : 'Ivan (N/A)'}
              </Text>

              <Text
                style={{
                  color: '#15212F',
                  fontFamily: 'monospace',
                  fontWeight: '400',
                  fontSize: 16,
                  marginTop: 12,
                  paddingLeft: 8,
                  lineHeight: 25,
                }}>
                {blogData?.content}
                {isLoading && 'Loading'}
              </Text>

              <Text
                style={{
                  color: '#15212F',
                  fontFamily: 'monospace',
                  marginTop: 20,
                  textAlign: 'right',
                  fontWeight: '600',
                  fontSize: 12,
                }}>
                Thanks for Reading
              </Text>
              <Text
                style={{
                  color: '#15212F',
                  fontFamily: 'monospace',
                  marginTop: 6,
                  textAlign: 'right',
                  fontWeight: '700',
                  fontSize: 12,
                }}>
                Ivan
              </Text>
            </View>
            <CommentSection />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default BlogDetail;

const styles = StyleSheet.create({});
