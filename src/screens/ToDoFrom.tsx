import {
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
import {Calendar} from 'react-native-calendars';

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
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: '#15212F',
                  fontSize: 20,
                  fontFamily: 'monospace',
                }}>
                Select reminder date.
              </Text>
              <Calendar
                style={{height: 'auto', width: 250}}
                onDayPress={day => {
                  console.log('selected day', day);
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ToDoFrom;

const styles = StyleSheet.create({});
