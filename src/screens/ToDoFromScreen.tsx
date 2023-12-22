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
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackScreenProps} from '../navigations/types';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import ToDoInput from '../components/ToDoInput';
import {SubmitHandler, useForm} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTodos} from '../hooks/useTodos';
import {ToDoFormField} from '../hooks/useTodos';
import {v4 as uuidv4} from 'uuid';
interface Props extends RootStackScreenProps<'ToDoForm'> {}

const ToDoFromScreen = ({navigation}: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);
  const [selectedTime, setSelectedTime] = useState<null | Date>(null);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const {control, handleSubmit} = useTodos();
  const [isReminderSwitchEnabled, isSetReminderSwitchEnabled] = useState(false);
  const toggleSwitch = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    isSetReminderSwitchEnabled(previousState => !previousState);
  };

  const showToast = (isError: boolean): void => {
    ToastAndroid.show(
      `${isError ? 'Something Went Wrong' : 'Successfully added'}`,
      ToastAndroid.LONG,
    );
  };

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
    // const id = uuidv4();
    // console.log(id);
    const todoData = {
      ...data,
      id: Date.now().toString(),
      selectedDate,
      selectedTime,
    };
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos !== null) {
        const parsedData = JSON.parse(storedTodos);
        const updatedData = [...parsedData, todoData];
        try {
          await AsyncStorage.setItem('todos', JSON.stringify(updatedData));
          showToast(false);
          setSelectedDate(null), setSelectedTime(null);
        } catch (error) {
          showToast(true);
        }
        return;
      }
      try {
        await AsyncStorage.setItem('todos', JSON.stringify([todoData]));
        showToast(false);
        setSelectedDate(null), setSelectedTime(null);
      } catch (error) {
        showToast(true);
      }
    } catch (error) {
      showToast(true);
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
      <ScrollView
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
          onPress={() => navigation.navigate('AllToDosList')}>
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
            marginTop: 5,
            color: '#15212F',
            fontSize: 25,
            fontWeight: '600',
            textAlign: 'center',
            fontFamily: 'monospace',
          }}>
          Add Todo
        </Text>

        <View style={{marginTop: 10, padding: 10}}>
          <ToDoInput
            label={'Title'}
            name={'title'}
            control={control}
            placeholder={'Add Todo Title'}
            height={50}
          />

          <ToDoInput
            label={'Description'}
            name={'description'}
            control={control}
            placeholder={'Add Todo Description'}
            height={200}
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
                color: '#15212F',
                fontWeight: '400',
                fontFamily: 'monospace',
              }}>
              Remind Me :
            </Text>
            <Switch
              style={{height: 40}}
              trackColor={{false: '#15212F', true: '#3f6491'}}
              thumbColor={isReminderSwitchEnabled ? '#2f8cfa' : '#c7c7c7'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isReminderSwitchEnabled}
            />
          </View>

          {isReminderSwitchEnabled && (
            <View style={{marginTop: 15, padding: 8}}>
              <Text
                style={{
                  color: '#15212F',
                  fontSize: 17,
                  fontWeight: '700',
                  fontFamily: 'monospace',
                }}>
                Select reminder date and time.
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 20,
                }}>
                <View style={{width: '45%'}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#15212F',
                      position: 'relative',
                      padding: 6,
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}
                    onPress={() => setIsDatePickerOpen(true)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#e9e9e9',
                        fontFamily: 'monospace',
                      }}>
                      Select Remind Date
                    </Text>
                    <Icon
                      style={{
                        position: 'absolute',
                        fontSize: 40,
                        color: '#888',
                        opacity: 0.2,
                        bottom: 0,
                        right: -10,
                        transform: [{rotate: '15deg'}],
                      }}
                      name="calendar-o"></Icon>
                  </TouchableOpacity>
                  {selectedDate && (
                    <Text
                      style={{
                        color: '#15212F',
                        marginTop: 10,
                        fontFamily: 'monospace',
                      }}>
                      Selected Time:{' '}
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
                      backgroundColor: '#15212F',
                      padding: 6,
                      borderRadius: 10,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onPress={() => setIsTimePickerOpen(true)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#e9e9e9',
                        fontFamily: 'monospace',
                      }}>
                      Select Remind Time
                    </Text>

                    <Icon
                      style={{
                        position: 'absolute',
                        fontSize: 40,
                        color: '#888',
                        opacity: 0.2,
                        bottom: 0,
                        right: -10,
                        transform: [{rotate: '15deg'}],
                      }}
                      name="clock-o"></Icon>
                  </TouchableOpacity>
                  {selectedTime && (
                    <Text
                      style={{
                        color: '#15212F',
                        marginTop: 10,
                        fontFamily: 'monospace',
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
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              marginTop: 5,
              backgroundColor: '#15212F',
              width: '50%',
              padding: 12,
              borderRadius: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#e9e9e9',
                fontFamily: 'monospace',
              }}>
              Add ToDo
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ToDoFromScreen;

const styles = StyleSheet.create({});