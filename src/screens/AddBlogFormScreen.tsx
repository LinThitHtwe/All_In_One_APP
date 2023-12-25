import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import {useBlog} from '../hooks/useBlog';
import ImagePicker from 'react-native-image-picker';
import {Image} from 'react-native';

type Props = {};

const AddBlogFormScreen = (props: Props) => {
  const {control, handleSubmit} = useBlog();

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePicker = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Select Image',
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Take Photo',
        chooseFromLibraryButtonTitle: 'Choose from Library',
        quality: 0.5,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          setSelectedImage(response.uri);
        }
      },
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
      <ScrollView style={{width: '100%'}}>
        <View
          style={{
            height: 740,
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
          />

          <CustomInput
            height={450}
            label="Detial"
            name="detail"
            placeholder="Blog etail"
            control={control}
          />

          <View>
            {selectedImage && (
              <Image
                source={{uri: selectedImage}}
                style={{width: 200, height: 200}}
              />
            )}
            <Button title="Pick an Image" onPress={handleImagePicker} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddBlogFormScreen;

const styles = StyleSheet.create({});
