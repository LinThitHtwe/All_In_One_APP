import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackScreenProps} from '../navigations/types';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTodos} from '../hooks/useTodos';
import {ToDoFormField} from '../hooks/useTodos';
import CustomInput from '../components/CustomInput';
import {useAppSelector} from '../redux/app/hook';
interface Props extends RootStackScreenProps<'ToDoForm'> {}
type ToDoFormParams = {
  description?: string;
  id?: string;
  title?: string;
  selectedDate?: string;
  selectedTime?: string;
};
const ToDoFromScreen = ({route, navigation}: Props) => {
  const {params} = route;
  console.log(params);
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  const {
    description: oldDescription,
    id: oldId,
    title: oldTitle,
    selectedDate: oldSelectedDate,
    selectedTime: oldSelectedTime,
  } = (params || {}) as ToDoFormParams;

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);
  const [selectedTime, setSelectedTime] = useState<null | Date>(null);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const {control, handleSubmit} = useTodos({
    title: oldTitle ? oldTitle : '',
    description: oldDescription,
  });
  const [isReminderSwitchEnabled, setIsReminderSwitchEnabled] = useState(false);
  const toggleSwitch = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setIsReminderSwitchEnabled(previousState => !previousState);
  };

  const showToast = (isError: boolean): void => {
    ToastAndroid.show(
      `${
        isError
          ? 'Something Went Wrong'
          : `Successfully ${oldTitle ? 'Updated' : 'Added'}`
      }`,
      ToastAndroid.LONG,
    );
  };

  useEffect(() => {
    if (oldSelectedDate && oldSelectedTime) {
      setIsReminderSwitchEnabled(true);
      setSelectedDate(new Date(oldSelectedDate));
      setSelectedTime(new Date(oldSelectedTime));
    }
  }, []);

  const onSubmit: SubmitHandler<ToDoFormField> = async data => {
    if (
      isReminderSwitchEnabled &&
      (selectedDate === null || selectedTime === null)
    ) {
      Alert.alert(
        'Required',
        'Date and Time Should be selected when mode is set to remind',
        [{text: 'Set Date and Time', onPress: () => console.log('OK Pressed')}],
      );
      return;
    }
    const todoData = {
      ...data,
      id: Date.now().toString(),
      selectedDate,
      selectedTime,
    };
    const {id, ...restTodoData} = todoData;
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos !== null) {
        const parsedData = JSON.parse(storedTodos);
        let updatedData = oldTitle
          ? parsedData.map((item: ToDoFormParams) =>
              item.id === oldId ? {...item, ...restTodoData} : item,
            )
          : [...parsedData, todoData];
        try {
          await AsyncStorage.setItem('todos', JSON.stringify(updatedData));
          showToast(false);
          setSelectedDate(null), setSelectedTime(null);
          setIsReminderSwitchEnabled(false);
          navigation.navigate('AllToDosList');
        } catch (error) {
          showToast(true);
        }
        return;
      }
      try {
        await AsyncStorage.setItem('todos', JSON.stringify([todoData]));
        showToast(false);
        setSelectedDate(null), setSelectedTime(null);
        setIsReminderSwitchEnabled(false);
        navigation.navigate('AllToDosList');
      } catch (error) {
        showToast(true);
      }
    } catch (error) {
      showToast(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this Todo?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              const storedTodosString = await AsyncStorage.getItem('todos');
              if (storedTodosString) {
                const storedTodos: ToDoFormParams[] =
                  JSON.parse(storedTodosString);
                const updatedTodos = storedTodos.filter(todo => todo.id !== id);
                await AsyncStorage.setItem(
                  'todos',
                  JSON.stringify(updatedTodos),
                );
                navigation.navigate('AllToDosList');
              }
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      ToastAndroid.show(`Something Went Wrong`, ToastAndroid.LONG);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: isDarkTheme ? '#070907' : '#F7F9F7',
        justifyContent: 'center',
      }}>
      <ScrollView
        style={{
          height: 730,
          backgroundColor: isDarkTheme ? '#070907' : '#F7F9F7',
          width: '100%',
          borderRadius: 10,
          padding: 10,
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
          onPress={() => navigation.navigate('AllToDosList')}>
          <Icon
            style={{
              color: isDarkTheme ? '#F4F6F4' : '#080A08',
              fontSize: 22,
              fontWeight: '600',
            }}
            name="arrow-left"></Icon>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 25,
            color: isDarkTheme ? '#F4F6F4' : '#080A08',
            fontSize: 25,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          Add Todo
        </Text>

        <View style={{marginTop: 10, padding: 10}}>
          <CustomInput
            label={'Title'}
            name={'title'}
            control={control}
            placeholder={'Add Todo Title'}
            height={40}
            inputType="text"
          />

          <CustomInput
            label={'Description'}
            name={'description'}
            control={control}
            placeholder={'Add Todo Description'}
            height={50}
            inputType="text"
          />

          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                textAlign: 'left',
                color: '#080A08',
                fontWeight: '400',
              }}>
              Remind Me :
            </Text>
            <Switch
              style={{height: 40}}
              trackColor={{false: '#435653', true: '#92A8AA'}}
              thumbColor={isReminderSwitchEnabled ? '#719071' : '#AABDBA'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isReminderSwitchEnabled}
            />
          </View>

          {isReminderSwitchEnabled && (
            <View style={{marginTop: 15, padding: 8}}>
              <Text
                style={{
                  color: isDarkTheme ? '#F7F9F7' : '#15212F',
                  fontSize: 17,
                  fontWeight: '500',
                }}>
                Select reminder date and time.
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 20,
                  height: 'auto',
                }}>
                <View style={{width: '45%', height: 'auto'}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: isDarkTheme ? '#435653' : '#AABDBA',
                      position: 'relative',
                      padding: 6,
                      borderRadius: 10,
                      overflow: 'hidden',
                      height: 60,
                      justifyContent: 'center',
                    }}
                    onPress={() => setIsDatePickerOpen(true)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#F7F9F7',
                        fontSize: 18,
                        fontWeight: '900',
                      }}>
                      Select Remind Date
                    </Text>
                    <Icon
                      style={{
                        position: 'absolute',
                        fontSize: 40,
                        color: isDarkTheme ? '#556B6D' : '#92A8AA',
                        opacity: 0.4,
                        bottom: 0,
                        zIndex: -10,
                        right: -10,
                        transform: [{rotate: '15deg'}],
                      }}
                      name="calendar-o"></Icon>
                  </TouchableOpacity>
                  {selectedDate && (
                    <Text
                      style={{
                        color: isDarkTheme ? '#F7F9F7' : '#15212F',
                        marginTop: 10,
                      }}>
                      Selected Date:{' '}
                      {selectedDate.getDate().toString().padStart(2, '0')}.
                      {(selectedDate.getMonth() + 1)
                        .toString()
                        .padStart(2, '0')}
                      .{selectedDate.getFullYear()}
                    </Text>
                  )}
                </View>
                <View style={{width: '45%'}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: isDarkTheme ? '#435653' : '#AABDBA',
                      position: 'relative',
                      padding: 6,
                      borderRadius: 10,
                      overflow: 'hidden',
                      height: 60,
                      justifyContent: 'center',
                    }}
                    onPress={() => setIsTimePickerOpen(true)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#F7F9F7',
                        fontSize: 18,
                        fontWeight: '900',
                      }}>
                      Select Remind Time
                    </Text>

                    <Icon
                      style={{
                        position: 'absolute',
                        fontSize: 40,
                        color: isDarkTheme ? '#556B6D' : '#92A8AA',
                        opacity: 0.6,
                        bottom: 0,
                        right: -10,
                        transform: [{rotate: '15deg'}],
                      }}
                      name="clock-o"></Icon>
                  </TouchableOpacity>
                  {selectedTime && (
                    <Text
                      style={{
                        color: isDarkTheme ? '#F7F9F7' : '#15212F',
                        marginTop: 10,
                      }}>
                      Selected Time:{' '}
                      {selectedTime.getHours().toString().padStart(2, '0')}:
                      {selectedTime.getMinutes().toString().padStart(2, '0')}
                    </Text>
                  )}
                </View>

                {isDatePickerOpen && (
                  <DateTimePicker
                    testID="datePicker"
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setIsDatePickerOpen(false);
                      if (event.type === 'set' && selectedDate)
                        setSelectedDate(selectedDate);
                    }}
                  />
                )}

                {isTimePickerOpen && (
                  <DateTimePicker
                    testID="timePicker"
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedTime) => {
                      setIsTimePickerOpen(false);
                      if (event.type === 'set' && selectedTime)
                        setSelectedTime(selectedTime);
                    }}
                  />
                )}
              </View>
            </View>
          )}
        </View>
        <View style={{alignItems: 'center'}}>
          {oldTitle ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 20,
              }}>
              <TouchableOpacity
                onPress={() => handleDelete(oldId!)}
                style={{
                  marginTop: 5,
                  backgroundColor: '#e00202',
                  width: '40%',
                  padding: 12,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}>
                <Text style={{color: '#F7F9F7', fontFamily: 'monospace'}}>
                  Delete Todo
                </Text>
                <Icon
                  style={{
                    color: '#F7F9F7',
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                  name="trash"></Icon>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={{
                  marginTop: 5,
                  backgroundColor: '#3cb043',
                  width: '40%',
                  padding: 12,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}>
                <Text style={{color: '#F7F9F7', fontFamily: 'monospace'}}>
                  Update Todo
                </Text>
                <Icon
                  style={{
                    color: '#F7F9F7',
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                  name="edit"></Icon>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                marginTop: 5,
                backgroundColor: '#719071',
                width: '50%',
                padding: 12,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#F7F9F7',
                  fontSize: 18,
                  fontWeight: '800',
                }}>
                Add ToDo
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ToDoFromScreen;

const styles = StyleSheet.create({});
