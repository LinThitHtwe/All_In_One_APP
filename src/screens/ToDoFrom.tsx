import {
  Button,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
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

interface Props extends RootStackScreenProps<'ToDoForm'> {}

const schema = z.object({
  title: z
    .string({required_error: 'Amount Cannot be Blank'})
    .min(3, 'ToDo Title must be more than 3 words'),

  description: z.string().nullable(),
});
type FormField = z.infer<typeof schema>;
const ToDoFrom = ({navigation}: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);
  const [selectedTime, setSelectedTime] = useState<null | Date>(null);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const {control, formState, handleSubmit} = useForm<FormField>({
    resolver: zodResolver(schema),
  });
  const {errors} = formState;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setIsEnabled(previousState => !previousState);
  };

  const onSubmit: SubmitHandler<FormField> = data => {
    console.log(data);
    console.log('submitted');
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
              thumbColor={isEnabled ? '#2f8cfa' : '#c7c7c7'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          {isEnabled && (
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
                      if (selectedDate) {
                        setSelectedDate(selectedDate);
                      }
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
                      if (selectedTime) {
                        setSelectedTime(selectedTime);
                      }
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
              marginTop: 25,
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

export default ToDoFrom;

const styles = StyleSheet.create({});
