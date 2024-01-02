import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomInput from '../components/CustomInput';
import {useBlog} from '../hooks/useBlog';
import ImagePicker from 'react-native-image-crop-picker';
import {Image} from 'react-native';
import {getBlogById, postBlog, updateBlog} from '../api/apiFunctions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {storage} from '../../MMKV';
import {useMiddleware} from '../hooks/useMIddleware';
import BottomNavigationBar from '../components/BottomNavigationBar';
import {RootStackScreenProps} from '../navigations/types';
import {useAppDispatch, useAppSelector} from '../redux/app/hook';
import useFetchData from '../hooks/useFetchData';
import {useFocusEffect} from '@react-navigation/native';
import {actions as userAction} from '../redux/features/user/userSlice';

interface Props extends RootStackScreenProps<'AddBlogFormScreen'> {}

const AddBlogFormScreen = ({route, navigation}: Props) => {
  const {params} = route;
  const dispatch = useAppDispatch();
  const {id} = params || {};
  const {data: prevData} = useFetchData([`blog${id}`], () => getBlogById(id));
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  const user = useAppSelector(state => state.user.user);
  const [forceUpdateKey, setForceUpdateKey] = React.useState(0);
  const forceUpdate = React.useCallback(() => {
    setForceUpdateKey(prevKey => prevKey + 1);
  }, []);
  const {control, handleSubmit} = useBlog({
    title: prevData ? prevData.title : '',
    content: prevData ? prevData.content : '',
  });
  const [imageData, setImageData] = useState(null);
  useMiddleware();
  useFocusEffect(
    React.useCallback(() => {
      if (prevData) {
        setImageData(prevData.picture);
        forceUpdate();
      }

      return () => {};
    }, [prevData, forceUpdate]),
  );
  const handleImagePicker = () => {
    ImagePicker.openPicker({
      width: 320,
      height: 260,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setImageData(image?.data);
    });
  };

  const onSubmit = async data => {
    try {
      if (prevData) {
        const response = await updateBlog(prevData._id, {
          ...data,
          picture: imageData,
        });
        navigation.navigate('BlogHomeScreen');
        ToastAndroid.show(`Successfull`, ToastAndroid.LONG);
        return;
      }

      const response = await postBlog({
        ...data,
        picture: imageData,
        user: user.user._id,
      });

      if (response.error) {
        // dispatch(userAction.clearUser());
        Alert.alert(
          'Error',
          'Something Went Wrong',
          [
            {
              text: 'Back to Home',
              onPress: () => navigation.navigate('HomeScreen'),
            },
            {
              text: 'Try Logging in',
              onPress: () => navigation.navigate('LoginSignupGreetingScreen'),
            },
          ],
          {cancelable: false},
        );
      }
      if (response.data) {
        navigation.navigate('BlogHomeScreen');
        ToastAndroid.show(`Successfull`, ToastAndroid.LONG);
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkTheme ? '#070907' : '#F7F9F7',
        alignItems: 'center',
      }}>
      <ScrollView style={{width: '100%'}}>
        <Text
          style={{
            color: isDarkTheme ? '#F4F6F4' : '#080A08',
            fontWeight: '700',
            fontSize: 30,
            marginTop: 12,
            textAlign: 'center',
          }}>
          Post New Blog
        </Text>

        <View style={{padding: 20, marginTop: 20}}>
          <CustomInput
            height={50}
            label="Title"
            name="title"
            placeholder="Blog Title"
            control={control}
            inputType="text"
          />

          <CustomInput
            height={50}
            label="Blog Content"
            name="content"
            placeholder="Blog Content"
            control={control}
            inputType="text"
          />

          {imageData && (
            <View style={{alignItems: 'center', marginTop: 40}}>
              <Image
                source={{uri: `data:image/jpeg;base64,${imageData}`}}
                style={{
                  width: 320,
                  height: 260,
                  borderRadius: 10,
                  position: 'relative',
                }}
              />
              <TouchableOpacity
                onPress={() => setImageData(null)}
                style={{
                  position: 'absolute',
                  top: -14,
                  right: 6,
                  backgroundColor: isDarkTheme ? '#556B6D' : '#92A8AA',
                  paddingHorizontal: 4,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 27,
                }}>
                <Icon
                  style={{
                    color: isDarkTheme ? '#708F70' : '#15212F',
                    fontSize: 20,
                    fontWeight: '600',
                  }}
                  name="times"></Icon>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            onPress={handleImagePicker}
            style={{
              marginTop: 30,
              paddingLeft: 10,
              borderColor: isDarkTheme
                ? 'rgba(112, 143, 112,0.8)'
                : 'rgba(113, 144, 113,0.7)',
              borderWidth: 1,
              width: '50%',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              padding: 10,
              borderRadius: 10,
            }}>
            <Icon
              style={{
                color: isDarkTheme ? '#708F70' : '#719071',
                fontSize: 24,
              }}
              name="upload"></Icon>
            <Text
              style={{
                color: isDarkTheme ? '#F4F6F4' : '#080A08',
                fontWeight: '600',
              }}>
              {imageData ? 'Change Image' : 'Upload Image'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              backgroundColor: isDarkTheme ? '#708F70' : '#719071',
              marginTop: 30,
              padding: 10,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 50,
              shadowColor: '#719071',
              elevation: 3.5,
              shadowOffset: {width: 10, height: 10},
              shadowOpacity: 0.1,
              shadowRadius: 40,
            }}>
            <Text
              style={{
                color: '#F7F9F7',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '700',
              }}>
              {prevData ? 'Update Blog' : 'Post Blog'}
            </Text>
            <Icon
              style={{
                color: '#F7F9F7',
                fontSize: 15,
              }}
              name="upload"></Icon>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavigationBar currentPage="AddBlogFormScreen" />
    </View>
  );
};

export default AddBlogFormScreen;

const styles = StyleSheet.create({});
