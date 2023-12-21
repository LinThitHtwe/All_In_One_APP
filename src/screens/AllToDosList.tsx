import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {RootStackScreenProps} from '../navigations/types';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props extends RootStackScreenProps<'AllToDosList'> {}

const AllToDosList = ({navigation}: Props) => {
  const [numColumns, setNumColumns] = useState(2);
  const data = Array.from({length: 10}, (_, index) => ({
    id: index.toString(),
    title: `Itemtfuiiiiiiiiikglkklgkgfifyuftuciiiiiiiii ${index + 1}`,
    description: `Description for Item ${index + 1}`,
  }));

  const renderItem = ({item}) => {
    let truncatedTitle = item.title;

    if (item.title.length > 25) {
      truncatedTitle = item.title.substring(0, 25) + '...';
    }
    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          height: 60,
          borderWidth: 1,
          borderColor: '#ccc',

          margin: 2,
          borderRadius: 10,
          backgroundColor: '#15212F',
        }}>
        <Text style={{fontSize: 20}}>{truncatedTitle}</Text>
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
          height: 730,
          backgroundColor: '#e9e9e9',
          width: '100%',
          borderRadius: 10,
          padding: 10,
          position: 'relative',
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 15,
            left: 15,
            zIndex: 30,
            width: 50,
            height: 40,
          }}
          onPress={() => navigation.goBack()}>
          <Icon
            style={{
              color: '#15212F',
              fontSize: 18,
              fontWeight: '600',
            }}
            name="arrow-left"></Icon>
        </TouchableOpacity>
        <Text
          style={{
            color: '#15212F',
            fontSize: 25,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          Your Todos
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 15,
              borderColor: 'rgba(21, 33, 47,0.6)',
              width: '78%',
              padding: 10,
            }}
            placeholder="Search todos"
            placeholderTextColor={'rgba(21, 33, 47,0.3)'}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#283e58',
              justifyContent: 'center',
              padding: 8,
              borderRadius: 10,
            }}>
            <Text style={{textAlign: 'center', fontSize: 14, color: '#e9e9e9'}}>
              Add More
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{marginTop: 20}}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          // key={`flatlist-${numColumns}`} // Ensure a unique key when changing the number of columns
          // numColumns={numColumns}
        />
      </View>
    </View>
  );
};

export default AllToDosList;

const styles = StyleSheet.create({});
