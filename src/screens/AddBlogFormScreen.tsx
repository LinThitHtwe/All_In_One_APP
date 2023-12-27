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

type Props = {};

const AddBlogFormScreen = (props: Props) => {
  const {control, handleSubmit} = useBlog();
  const [imageData, setImageData] = useState(null);
  useMiddleware();
  const handleImagePicker = () => {
    ImagePicker.openPicker({
      width: 316,
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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#15212F',
        justifyContent: 'center',
        padding: 13,
      }}>
      <ScrollView style={{width: '100%'}}>
        <View
          style={{
            backgroundColor: '#e9e9e9',
            width: '100%',
            borderRadius: 10,
            padding: 10,
            position: 'relative',
          }}>
          <Text
            style={{
              color: '#15212F',
              fontSize: 24,
              textAlign: 'center',
              fontWeight: '700',
              fontFamily: 'monospace',
            }}>
            Post New Blog
          </Text>

          <CustomInput
            height={50}
            label="Title"
            name="title"
            placeholder="Blog Title"
            control={control}
            inputType="text"
          />

          <CustomInput
            height={450}
            label="Blog Content"
            name="content"
            placeholder="Blog Content"
            control={control}
            inputType="text"
          />

          <View
            style={{
              alignItems: 'center',
              marginVertical: 20,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            {imageData && (
              <View>
                <Text
                  style={{
                    color: '#15212F',
                    width: '95%',
                    marginVertical: 6,
                    fontFamily: 'monospace',
                  }}>
                  Image Preview :
                </Text>
                <Image
                  source={{uri: `data:image/jpeg;base64,${imageData}`}}
                  style={{
                    width: 316,
                    height: 260,
                    borderRadius: 10,
                    position: 'relative',
                  }}
                />

                <TouchableOpacity
                  onPress={() => setImageData(null)}
                  style={{position: 'absolute', top: 15, right: 0}}>
                  <Icon
                    style={{
                      color: '#15212F',
                      fontSize: 25,
                      fontWeight: '600',
                    }}
                    name="times"></Icon>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 60,
            }}>
            <TouchableOpacity
              onPress={handleImagePicker}
              style={{
                backgroundColor: '#15212F',
                padding: 10,
                borderRadius: 10,
              }}>
              <Text style={{color: '#e9e9e9'}}>
                {imageData ? 'Change Image' : 'Pick an Image'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 90,
            }}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: '#15212F',
                padding: 15,
                borderRadius: 10,
                width: '90%',
              }}>
              <Text style={{color: '#e9e9e9', textAlign: 'center'}}>
                Post Blog
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddBlogFormScreen;

const styles = StyleSheet.create({});
