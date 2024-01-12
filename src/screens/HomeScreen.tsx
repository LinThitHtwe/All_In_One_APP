import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RootStackScreenProps} from '../navigations/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToCurrencyConverterWidget from '../components/ToCurrencyConverterWidget';
import ToWeatherForecast from '../components/ToWeatherForecast';
import ReadBlogsToday from '../components/ReadBlogsToday';
import BlogHomeHeader from '../components/BlogHomeHeader';
import BottomNavigationBar from '../components/BottomNavigationBar';
import ToDoListSvg from '../svgs/ToDoListSVG';
import useFetchData from '../hooks/useFetchData';
import {getLatestBlog} from '../api/apiFunctions';
import {RefreshControl} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/app/hook';
import {useFocusEffect} from '@react-navigation/native';

interface Props extends RootStackScreenProps<'HomeScreen'> {}

const HomeScreen = ({navigation}: Props) => {
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  const {
    data: latestBlog,
    isRefetching,
    isLoading,

    refetch,
  } = useFetchData(['latest-blog'], getLatestBlog);
  // const handleDeleteData = async () => {
  //   try {
  //     // Replace 'todos' with the key you used to store your data
  //     await AsyncStorage.removeItem('todos');
  //     console.log('Data deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting data:', error);
  //   }
  // };

  // handleDeleteData();

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );
  return (
    <View
      style={{
        backgroundColor: isDarkTheme ? '#070907' : '#F7F9F7',
        flex: 1,
        position: 'relative',
      }}>
      <BlogHomeHeader />
      <ScrollView
        style={{width: '100%', marginTop: 60}}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }>
        <View
          style={{
            padding: 10,
            marginTop: 0,
            height: 'auto',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '95%',
              marginBottom: 6,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: isDarkTheme ? '#F4F6F4' : '#090B09',
                fontSize: 16,
                fontWeight: '500',
              }}>
              Read Latest Blog{' '}
            </Text>
            <Icon
              style={{
                color: isDarkTheme ? '#F4F6F4' : '#090B09',
                fontSize: 13,
                marginTop: 3,
                marginLeft: 5,
              }}
              name="arrow-down"></Icon>
          </View>
          <TouchableOpacity
            onPress={() =>
              latestBlog &&
              navigation.navigate('BlogDetail', {blogId: latestBlog._id})
            }
            style={{
              backgroundColor: isDarkTheme ? '#070907' : '#F7F9F7',
              borderTopStartRadius: 60,
              borderTopEndRadius: 60,
              borderBottomStartRadius: 30,
              borderBottomEndRadius: 30,
              height: 420,
              width: 350,
              shadowColor: '#719071',
              elevation: 15,
              shadowOffset: {width: 20, height: 20},
              shadowOpacity: 1,
              shadowRadius: 9,
              borderColor: isDarkTheme
                ? 'rgba(244, 246, 244,0.4)'
                : 'rgba(113, 144, 113,0.1)',
              borderWidth: isDarkTheme ? 0 : 1,
              overflow: 'hidden',
              position: 'relative',
            }}>
            {isLoading && (
              <ActivityIndicator
                color={'#719071'}
                style={{marginTop: 200}}
                size={65}
              />
            )}
            {latestBlog && !isLoading && (
              <>
                <Image
                  source={{
                    uri: latestBlog.picture
                      ? `data:image/jpeg;base64,${latestBlog.picture}`
                      : 'https://images.unsplash.com/photo-1602300991431-27a957a5bcf7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGdyZWVufGVufDB8fDB8fHww',
                  }}
                  style={{
                    height: '83%',
                    width: '100%',
                    borderTopLeftRadius: 60,
                    borderTopRightRadius: 60,
                    borderBottomLeftRadius: isDarkTheme ? 0 : 20,
                    borderBottomRightRadius: isDarkTheme ? 0 : 20,
                  }}
                />
                <View
                  style={{
                    backgroundColor: isDarkTheme
                      ? 'rgba(244, 246, 244,1)'
                      : 'rgba(247, 249, 247,)',
                    justifyContent: 'center',
                    padding: 8,
                    height: '17%',
                    bottom: 0,
                    zIndex: 10,
                    right: 0,
                    left: 0,
                    width: 350,
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 22,
                      color: isDarkTheme ? '#070907' : '#080A08',
                      fontWeight: '700',
                      letterSpacing: 3,
                      fontFamily: 'System',
                      textAlign: 'center',
                      lineHeight: 30,
                    }}>
                    {latestBlog.title}
                  </Text>
                </View>
              </>
            )}
          </TouchableOpacity>
          <View
            style={{
              height: 'auto',
              width: '103%',
              marginTop: 25,
              padding: 0,
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginBottom: 20,
              position: 'relative',
            }}>
            <ReadBlogsToday />

            <View style={{width: '40%', justifyContent: 'space-between'}}>
              <ToCurrencyConverterWidget />
              <ToWeatherForecast />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('AllToDosList')}
            style={{
              height: 60,
              marginVertical: 5,
              width: '100%',
              borderRadius: 10,
              backgroundColor: isDarkTheme ? '#708F70' : '#719071',
              padding: 10,
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
            <Text
              style={{
                color: '#F7F9F7',
                letterSpacing: 2,
                fontSize: 26,
                fontWeight: '700',
              }}>
              Your Todos
            </Text>

            <Icon
              style={{
                color: '#F7F9F7',
                fontSize: 18,
                marginTop: 3,
                marginLeft: 5,
                position: 'absolute',
                right: 20,
              }}
              name="arrow-right"></Icon>

            <View
              style={{
                position: 'absolute',
                right: 35,
                top: 5,

                // backgroundColor: '#F7F9F7',

                transform: [{rotate: '15deg'}],
              }}>
              <ToDoListSvg
                height={'46.944265'}
                width={'84.867538'}
                shouldHumanAppear={false}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ToDoForm')}
            style={{
              height: 60,
              marginVertical: 5,
              width: '100%',
              borderRadius: 10,
              marginBottom: 70,
              backgroundColor: isDarkTheme ? '#708F70' : '#708F70',
              padding: 10,
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
            <Text
              style={{
                color: '#F7F9F7',
                letterSpacing: 2,
                fontSize: 26,
                fontWeight: '700',
              }}>
              Add Todos
            </Text>

            <Icon
              style={{
                color: '#F7F9F7',
                fontSize: 18,
                marginTop: 3,
                marginLeft: 5,

                position: 'absolute',
                right: 20,
              }}
              name="arrow-right"></Icon>

            <View
              style={{
                position: 'absolute',
                right: 35,
                top: 5,

                // backgroundColor: '#F7F9F7',

                transform: [{rotate: '15deg'}],
              }}></View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavigationBar currentPage="HomeScreen" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F9FCF9',
  },
  weatherContainer: {
    width: '100%',
    height: 170,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  weatherImage: {height: 110, width: 110},

  weatherCityText: {
    textAlign: 'center',
    fontSize: 40,
    color: '#F7F9F7',
  },

  weatherTemperature: {
    textAlign: 'center',
    fontSize: 35,
    color: '#F7F9F7',
  },

  scrollContainer: {
    backgroundColor: '#719071',
    height: '150%',
    borderRadius: 23,
    padding: 3,
    position: 'relative',
    marginBottom: 2,
  },
});
