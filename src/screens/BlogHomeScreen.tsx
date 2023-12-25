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

type Props = {};

const BlogHomeScreen = (props: Props) => {
  const data = Array(6).fill(null);

  const renderItem = () => {
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
            uri: 'https://images.unsplash.com/photo-1682686579688-c2ba945eda0e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
          Quality Of Life
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
          Ivan (1 hour ago){' '}
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
          voluptates tempora ullam ipsam sit in deleniti .....
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
        <FlatList
          style={{marginBottom: 30}}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={<View style={{marginTop: 20}}></View>}
        />
      </View>
    </View>
  );
};

export default BlogHomeScreen;

const styles = StyleSheet.create({});
