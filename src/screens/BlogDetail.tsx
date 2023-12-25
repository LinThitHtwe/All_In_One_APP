import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const BlogDetail = (props: Props) => {
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
        <ScrollView style={{width: '100%'}}>
          <Text
            style={{
              fontFamily: 'monospace',
              textAlign: 'center',
              color: '#15212F',
              fontSize: 23,
            }}>
            Lorem ipsum dolor, sit am...
          </Text>
          <View style={{padding: 10, marginTop: 30}}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1682686579688-c2ba945eda0e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
                  fontWeight: '400',
                  fontSize: 16,
                  marginTop: 12,
                  paddingLeft: 8,
                  lineHeight: 25,
                }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Debitis cumque facere veritatis cupiditate doloremque, eligendi
                amet doloribus culpa consequuntur ut nemo maxime ullam, iure
                porro asperiores facilis sequi dicta quam!r Lorem ipsum dolor
                sit amet, consectetur adipisicing elit. Debitis cumque facere
                veritatis cupiditate doloremque, eligendi amet doloribus culpa
                consequuntur ut nemo maxime ullam, iure porro asperiores facilis
                sequi dicta quam!r Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Debitis cumque facere veritatis cupiditate
                doloremque, eligendi amet doloribus culpa consequuntur ut nemo
                maxime ullam, iure porro asperiores facilis sequi dicta quam!r
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Debitis cumque facere veritatis cupiditate doloremque, eligendi
                amet doloribus culpa consequuntur ut nemo maxime ullam, iure
                porro asperiores facilis sequi dicta quam!r Lorem ipsum dolor
                sit amet, consectetur adipisicing elit. Debitis cumque facere
                veritatis cupiditate doloremque, eligendi amet doloribus culpa
                consequuntur ut nemo maxime ullam, iure porro asperiores facilis
                sequi dicta quam!r maxime ullam, iure porro asperiores facilis
                sequi dicta quam!r Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Debitis cumque facere veritatis cupiditate
                doloremque, eligendi amet doloribus culpa consequuntur ut nemo
                maxime ullam, iure porro asperiores facilis sequi dicta quam!r
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. De
              </Text>
            </View>
            <View style={{marginTop: 20, marginBottom: 60}}>
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
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default BlogDetail;

const styles = StyleSheet.create({});
