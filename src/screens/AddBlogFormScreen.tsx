import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import {useBlog} from '../hooks/useBlog';
import ImagePicker from 'react-native-image-crop-picker';
import {Image} from 'react-native';
import {postBlog} from '../api/apiFunctions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {storage} from '../../MMKV';
import {useMiddleware} from '../hooks/useMIddleware';
import BottomNavigationBar from '../components/BottomNavigationBar';

type Props = {};

const AddBlogFormScreen = (props: Props) => {
  const {control, handleSubmit} = useBlog();
  const [imageData, setImageData] = useState(null);
  useMiddleware();
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
      const response = await postBlog({
        ...data,
        picture: imageData,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F7F9F7', alignItems: 'center'}}>
      <ScrollView style={{width: '100%'}}>
        <Text
          style={{
            color: '#080A08',
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
                  backgroundColor: '#92A8AA',
                  paddingHorizontal: 4,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 27,
                }}>
                <Icon
                  style={{
                    color: '#15212F',
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
              borderColor: 'rgba(113, 144, 113,0.7)',
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
                color: '#719071',
                fontSize: 24,
              }}
              name="upload"></Icon>
            <Text style={{color: '#080A08'}}>
              {imageData ? 'Change Image' : 'Upload Image'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              backgroundColor: '#719071',
              marginTop: 30,
              padding: 10,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 50,
            }}>
            <Text
              style={{
                color: '#F7F9F7',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '700',
              }}>
              Post Blog
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
