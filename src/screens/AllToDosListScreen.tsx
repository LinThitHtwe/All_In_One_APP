import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootStackScreenProps} from '../navigations/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {string} from 'zod';

interface Props extends RootStackScreenProps<'AllToDosList'> {}
type TodoItem = {
  item: {
    title: string;
    description: string | null;
    selectedDate: string | null;
    selectedTime: string | null;
  };
};

type ToDoList = {
  title: string;
  description: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
};
const AllToDosListScreen = ({navigation}: Props) => {
  const [todos, setTodos] = useState<ToDoList[] | null>(null);
  const renderItem = ({item}: TodoItem) => {
    let truncatedTitle = item.title;
    if (item.title.length > 25) {
      truncatedTitle = item.title.substring(0, 18) + '...';
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
        <Text style={{fontSize: 20, fontFamily: 'monospace'}}>
          {truncatedTitle}
        </Text>
      </View>
    );
  };
  useEffect(() => {
    const getAsyncStorageData = async () => {
      try {
        const storedTodos: string | null = await AsyncStorage.getItem('todos');
        if (storedTodos) setTodos(JSON.parse(storedTodos));
      } catch (error) {
        // ToastAndroid.show(`Something Went Wrong`, ToastAndroid.LONG);
      }
    };
    getAsyncStorageData();
  }, []);

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
            fontFamily: 'monospace',
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
              width: '76%',
              padding: 10,
              fontFamily: 'monospace',
            }}
            placeholder="Search todos"
            placeholderTextColor={'rgba(21, 33, 47,0.3)'}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ToDoForm')}
            style={{
              backgroundColor: '#283e58',
              justifyContent: 'center',
              padding: 8,
              borderRadius: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: '#e9e9e9',
                fontFamily: 'monospace',
              }}>
              Add More
            </Text>
          </TouchableOpacity>
        </View>
        {!todos || todos.length === 0 ? (
          <Text>No Todo List Yet, Add One Now :3</Text>
        ) : (
          <FlatList
            style={{marginTop: 20}}
            data={todos}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

export default AllToDosListScreen;

const styles = StyleSheet.create({});
