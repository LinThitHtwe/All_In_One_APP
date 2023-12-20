import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import BottomNavigationBar from '../components/BottomNavigationBar';

type Props = {};

const CurrencyConverter = (props: Props) => {
  const [selectedValue, setSelectedValue] = useState('option1');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#15212F',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}>
      <View
        style={{
          backgroundColor: '#e9e9e9',
          height: 730,
          borderRadius: 23,
          padding: 13,
          width: '100%',
        }}>
        <Text
          style={{
            color: '#15212F',
            fontSize: 1,
            fontWeight: '600',
            marginBottom: 8,
          }}>
          Back
        </Text>

        <Text
          style={{
            color: '#15212F',
            fontSize: 30,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          Currency Converter
        </Text>

        <View style={{marginTop: 30}}>
          <Text
            style={{
              fontSize: 20,
              color: '#15212F',
              fontWeight: '600',
              marginBottom: 10,
            }}>
            From:
          </Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            style={{
              color: '#fff',
              backgroundColor: '#15212F',
              opacity: 0.8,
            }}>
            <Picker.Item label="Option 1" value="option1" />
            <Picker.Item label="Option 2" value="option2" />
            <Picker.Item label="Option 3" value="option3" />
          </Picker>

          <Text
            style={{
              fontSize: 20,
              color: '#15212F',
              fontWeight: '600',
              marginBottom: 10,
              marginTop: 30,
            }}>
            To:
          </Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            style={{
              color: '#fff',
              backgroundColor: '#15212F',
              opacity: 0.8,
            }}>
            <Picker.Item label="Option 1" value="option1" />
            <Picker.Item label="Option 2" value="option2" />
            <Picker.Item label="Option 3" value="option3" />
          </Picker>
          <View style={{marginTop: 0}}>
            <Text
              style={{
                fontSize: 20,
                color: '#15212F',
                fontWeight: '600',
                marginBottom: 10,
                marginTop: 30,
              }}>
              Amount:
            </Text>
            <TextInput
              style={{
                backgroundColor: '#fff',
                borderRadius: 15,
                padding: 10,
                paddingHorizontal: 15,
                color: '#15212F',
              }}
              inputMode="numeric"
              placeholder="Amount to Convert"
              placeholderTextColor={'rgba(21, 33, 47, 0.3)'}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 60, opacity: 0.8}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#15212F',
                padding: 10,
                paddingVertical: 13,
                width: '35%',
                borderRadius: 10,
              }}>
              <Text style={{textAlign: 'center', color: '#fff'}}>Convert</Text>
            </TouchableOpacity>
          </View>
          <Text style={{textAlign: 'center'}}>
            Selected Value: {selectedValue}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CurrencyConverter;

const styles = StyleSheet.create({});
