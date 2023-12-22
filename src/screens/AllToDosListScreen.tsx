import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import {RootStackScreenProps} from '../navigations/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends RootStackScreenProps<'AllToDosList'> {}
type RenderItemProps = {
  item: {
    id: string;
    title: string;
    description: string | null;
    selectedDate: string | null;
    selectedTime: string | null;
  };
  index: number;
};

type ToDoList = {
  id: string;
  title: string;
  description: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
};
const AllToDosListScreen = ({navigation}: Props) => {
  const [todos, setTodos] = useState<ToDoList[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<boolean[]>(
    Array(todos?.length).fill(false),
  );

  const handleCheckBoxChange = (index: number) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
  };
  const [isDeleteEnable, setIsDeleteEnable] = useState<boolean>(false);
  const renderItem = ({item, index}: RenderItemProps) => {
    let truncatedTitle = item.title;
    if (item.title.length > 25) {
      truncatedTitle = item.title.substring(0, 18) + '...';
    }
    return (
      <Pressable
        onLongPress={() => {
          Vibration.vibrate();
          setIsDeleteEnable(true);
        }}
        style={{
          flex: 1,
          padding: 10,
          height: 60,
          borderWidth: 1,
          borderColor: '#ccc',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 2,
          borderRadius: 10,
          backgroundColor: '#15212F',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontFamily: 'monospace', color: '#e9e9e9'}}>
          {truncatedTitle}
        </Text>
        {!isDeleteEnable && (
          <TouchableOpacity
            style={{marginRight: 5}}
            onPress={() => navigation.navigate('ToDoForm', item)}>
            <Icon
              style={{
                color: '#e9e9e9',
                fontSize: 18,
                fontWeight: '600',
              }}
              name="edit"></Icon>
          </TouchableOpacity>
        )}
        {isDeleteEnable && (
          <CheckBox
            style={{borderRadius: 10}}
            disabled={false}
            value={selectedItems[index]}
            onValueChange={() => handleCheckBoxChange(index)}
          />
        )}
      </Pressable>
    );
  };
  useEffect(() => {
    console.log('useEffectRun');
    const getAsyncStorageData = async () => {
      try {
        const storedTodos: string | null = await AsyncStorage.getItem('todos');
        if (storedTodos) setTodos(JSON.parse(storedTodos));
      } catch (error) {
        // ToastAndroid.show(`Something Went Wrong`, ToastAndroid.LONG);
      }
    };
    // console.log('hi');
    getAsyncStorageData();
  }, []);
  console.log('storedTodos--', todos);
  const filteredTodos = todos?.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const DeleteMessage = () => {
    const selectedCount = selectedItems.filter(item => item).length;
    return (
      <>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            marginTop: 10,
          }}>
          {selectedCount > 0 && (
            <Text
              style={{
                color: '#ff0000',
                textAlign: 'right',
                fontFamily: 'monospace',
                textDecorationLine: 'underline',
              }}>
              Delete {selectedCount} {''}
              {selectedCount === 1 ? 'Todo' : 'Todos'} ?
            </Text>
          )}
        </TouchableOpacity>
        {isDeleteEnable && (
          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => {
              setIsDeleteEnable(false);
              setSelectedItems(Array(todos?.length).fill(false));
            }}>
            <Text style={{color: '#15212F', textAlign: 'right'}}>Cancel</Text>
          </TouchableOpacity>
        )}
      </>
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
          onPress={() => {
            navigation.goBack();
          }}>
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
            onChangeText={text => setSearchQuery(text)}
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
        <DeleteMessage />
        {!todos || todos.length === 0 ? (
          <>
            <Text
              style={{
                fontFamily: 'monospace',
                color: '#15212F',
                marginTop: 30,
                textAlign: 'center',
              }}>
              No Todo List Yet, Add One Now :3
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ToDoForm')}
                style={{
                  backgroundColor: '#283e58',
                  justifyContent: 'center',
                  padding: 12,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: '#e9e9e9',
                    fontFamily: 'monospace',
                  }}>
                  Add One
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <FlatList
            style={{marginTop: 20}}
            data={filteredTodos}
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
