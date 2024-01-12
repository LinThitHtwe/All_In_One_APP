import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import {RootStackScreenProps} from '../navigations/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useAppSelector} from '../redux/app/hook';

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
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
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
          borderColor: '#719071',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 2,
          borderRadius: 10,
          backgroundColor: '#719071',
          alignItems: 'center',
          width: '99%',
        }}>
        <Text style={{fontSize: 20, color: '#F7F9F7'}}>{truncatedTitle}</Text>
        {!isDeleteEnable && (
          <TouchableOpacity
            style={{marginRight: 5}}
            onPress={() => navigation.navigate('ToDoForm', item)}>
            <Icon
              style={{
                color: '#F7F9F7',
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
  useFocusEffect(
    React.useCallback(() => {
      const getAsyncStorageData = async () => {
        try {
          const storedTodos: string | null = await AsyncStorage.getItem(
            'todos',
          );
          if (storedTodos) setTodos(JSON.parse(storedTodos));
        } catch (error) {
          // ToastAndroid.show(`Something Went Wrong`, ToastAndroid.LONG);
        }
      };

      getAsyncStorageData();

      return () => {
        // Cleanup code
      };
    }, []),
  );
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
            width: '100%',
          }}>
          {selectedCount > 0 && (
            <Text
              style={{
                color: '#ff0000',
                textAlign: 'right',

                textDecorationLine: 'underline',
              }}>
              Delete {selectedCount} {''}
              {selectedCount === 1 ? 'Todo' : 'Todos'} ?
            </Text>
          )}
        </TouchableOpacity>
        {isDeleteEnable && (
          <TouchableOpacity
            style={{marginTop: 10, width: '100%'}}
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
        backgroundColor: isDarkTheme ? '#070907' : '#F7F9F7',
        justifyContent: 'center',
        padding: 13,
        position: 'relative',
      }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 25,
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
            color: isDarkTheme ? '#F7F9F7' : '#080A08',
            fontSize: 18,
            fontWeight: '600',
          }}
          name="arrow-left"></Icon>
      </TouchableOpacity>
      <Text
        style={{
          color: isDarkTheme ? '#F7F9F7' : '#080A08',
          fontSize: 25,
          fontWeight: '600',
          textAlign: 'center',
          letterSpacing: 3,
          marginTop: 10,
        }}>
        Your Todos
      </Text>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 15,
            color: isDarkTheme
              ? 'rgba(244, 246, 244,0.4)'
              : 'rgba(21, 33, 47,1)',
            borderColor: isDarkTheme
              ? 'rgba(244, 246, 244,0.4)'
              : 'rgba(21, 33, 47,0.6)',
            width: '78%',
            padding: 10,
          }}
          placeholder="Search todos"
          placeholderTextColor={
            isDarkTheme ? 'rgba(244, 246, 244,0.4)' : 'rgba(21, 33, 47,0.2)'
          }
          onChangeText={text => setSearchQuery(text)}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('ToDoForm')}
          style={{
            backgroundColor: '#719071',
            justifyContent: 'center',
            padding: 8,
            borderRadius: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              color: '#F7F9F7',
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
                  color: '#F7F9F7',
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
  );
};

export default AllToDosListScreen;

const styles = StyleSheet.create({});
