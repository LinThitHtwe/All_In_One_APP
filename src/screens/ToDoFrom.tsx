import {
  Button,
  Platform,
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
import {useForm} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props extends RootStackScreenProps<'ToDoForm'> {}

const schema = z.object({
  title: z
    .string({required_error: 'Amount Cannot be Blank'})
    .min(3, 'ToDo Title must be more than 3 words'),

  toRemind: z.boolean({
    required_error: 'isActive is required',
    invalid_type_error: 'isActive must be a boolean',
  }),
});

const ToDoFrom = ({navigation}: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const {control, formState} = useForm();
  const {errors} = formState;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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

        <View style={{marginTop: 30}}>
          <ToDoInput
            label={'Title'}
            name={'title'}
            control={control}
            placeholder={'Add Todo Title'}
            height={50}
          />

          <ToDoInput
            label={'Description'}
            name={'Description'}
            control={control}
            placeholder={'Add Todo Description'}
            height={200}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
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
            <View style={{marginTop: 15}}>
              <Text
                style={{
                  color: '#15212F',
                  fontSize: 18,
                  fontFamily: 'monospace',
                }}>
                Select reminder date.
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#15212F',
                    width: '45%',
                    padding: 6,
                    borderRadius: 10,
                  }}
                  onPress={() => setIsDatePickerOpen(true)}>
                  <Text style={{textAlign: 'center'}}>Select Remind Date</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#15212F',
                    width: '45%',
                    padding: 6,
                    borderRadius: 10,
                  }}
                  onPress={() => setIsTimePickerOpen(true)}>
                  <Text style={{textAlign: 'center'}}>Select Remind Time</Text>
                </TouchableOpacity>

                {isDatePickerOpen && (
                  <DateTimePicker
                    testID="datePicker"
                    value={selectedDate}
                    mode="date"
                    // is24Hour={true}
                    display="default"
                    onChange={() => setIsDatePickerOpen(false)}
                  />
                )}

                {isTimePickerOpen && (
                  <DateTimePicker
                    testID="datePicker"
                    value={selectedDate}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={() => setIsDatePickerOpen(false)}
                  />
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ToDoFrom;

const styles = StyleSheet.create({});
