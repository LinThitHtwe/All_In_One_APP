import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackScreenProps} from '../navigations/types';
import BottomNavigationBar from '../components/BottomNavigationBar';
import useFetchData from '../hooks/useFetchData';
import {getAllBlogs} from '../api/apiFunctions';
import {formatDistanceToNow} from 'date-fns';

interface Props extends RootStackScreenProps<'BlogHomeScreen'> {}

const BlogHomeScreen = ({navigation}: Props) => {
  const {data: bookData} = useFetchData(['blogs'], getAllBlogs);

  const renderItem = data => {
    return (
      <View
        style={{
          borderWidth: 1,
          minHeight: 430,
          maxHeight: 'auto',
          borderRadius: 10,
          padding: 10,
          borderColor: 'rgba(21, 33, 47,0.3)',
        }}>
        <Image
          source={{
            uri: data.picture
              ? `data:image/jpeg;base64,${data.picture}`
              : 'https://plus.unsplash.com/premium_photo-1681487807762-98fbe8a9db5e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={{height: 260, width: '100%', borderRadius: 10}}
        />

        <Text
          style={{
            color: '#15212F',
            marginTop: 8,
            paddingLeft: 3,
            fontSize: 20,
            fontFamily: 'monospace',
            fontWeight: '700',
          }}>
          {data.title}
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
          {data?.updatedAt
            ? `Ivan (${formatDistanceToNow(new Date(data.updatedAt), {
                addSuffix: true,
              })})`
            : 'Ivan (N/A)'}
        </Text>

        <Text
          style={{
            color: '#15212F',
            fontFamily: 'monospace',
            fontWeight: '100',
            fontSize: 13,
            marginTop: 12,
            paddingLeft: 8,
            opacity: 0.7,
          }}>
          {data.content.length > 20
            ? `${data.content.slice(0, 90)}..`
            : data.content}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 10,
            right: 0,
            left: 0,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 16,
              alignItems: 'center',
              opacity: 0.8,
              marginLeft: 8,
            }}>
            <TouchableOpacity>
              <Icon
                style={{
                  color: '#15212F',
                  fontSize: 20,
                  fontWeight: '600',
                }}
                name="thumbs-o-up"></Icon>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                style={{
                  color: '#15212F',
                  fontSize: 20,
                  fontWeight: '600',
                }}
                name="thumbs-o-down"></Icon>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BlogDetail', {blogId: data._id})
            }
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              opacity: 0.8,
            }}>
            <Text style={{color: '#15212F'}}>ReadMore</Text>
            <Icon
              style={{
                color: '#15212F',
                fontSize: 14,
                fontWeight: '600',
              }}
              name="arrow-right"></Icon>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{position: 'absolute', top: 3, right: 10, opacity: 0.8}}>
          <Icon
            style={{
              color: '#15212F',
              fontSize: 28,
              fontWeight: '600',
            }}
            name="bookmark-o"></Icon>
        </TouchableOpacity>
      </View>
    );
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
          height: 740,
          backgroundColor: '#e9e9e9',
          width: '100%',
          borderRadius: 10,
          padding: 10,
          position: 'relative',
        }}>
        {bookData && (
          <FlatList
            style={{marginBottom: 30}}
            data={bookData}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={<View style={{marginTop: 20}}></View>}
          />
        )}
      </View>
    </View>
  );
};

export default BlogHomeScreen;

const styles = StyleSheet.create({});
