import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';

type Props = {};

const CurrencyConverter = (props: Props) => {
  const [selectedValue, setSelectedValue] = useState('option1');

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.mainContainer}>
      <View style={styles.bodyCard}>
        <Text
          style={{
            color: '#15212F',
            fontSize: 13,
            fontWeight: '600',
            marginBottom: 8,
          }}>
          Back
        </Text>
        <Text style={styles.titleText}>Currency Converter</Text>

        <View style={{marginTop: 20}}>
          <Text style={styles.optionBoxText}>From:</Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            style={styles.optionBox}>
            <Picker.Item label="Option 1" value="option1" />
            <Picker.Item label="Option 2" value="option2" />
            <Picker.Item label="Option 3" value="option3" />
          </Picker>

          <Text style={styles.optionBoxText}>To:</Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            style={styles.optionBox}>
            <Picker.Item label="Option 1" value="option1" />
            <Picker.Item label="Option 2" value="option2" />
            <Picker.Item label="Option 3" value="option3" />
          </Picker>
          <View>
            <Text style={styles.amountInputLabel}>Amount:</Text>
            <TextInput
              style={styles.amountInput}
              inputMode="numeric"
              placeholder="Amount to Convert"
              placeholderTextColor={'rgba(21, 33, 47, 0.3)'}
            />
          </View>
          <View style={styles.converBtnContainer}>
            <TouchableOpacity style={styles.amountConvertBtn}>
              <Text style={styles.amountConvertText}>Convert</Text>
            </TouchableOpacity>
          </View>
          <Text style={{textAlign: 'center'}}>
            Selected Value: {selectedValue}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CurrencyConverter;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#15212F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },

  bodyCard: {
    backgroundColor: '#e9e9e9',
    height: 730,
    borderRadius: 23,
    padding: 13,
    width: '100%',
  },
  titleText: {
    color: '#15212F',
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },

  optionBoxText: {
    fontSize: 20,
    color: '#15212F',
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 20,
  },

  optionBox: {
    color: '#fff',
    backgroundColor: '#15212F',
    opacity: 0.8,
  },

  amountInputLabel: {
    fontSize: 20,
    color: '#15212F',
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 30,
  },

  amountInput: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 15,
    color: '#15212F',
  },

  amountConvertBtn: {
    backgroundColor: '#15212F',
    padding: 10,
    paddingVertical: 13,
    width: '35%',
    borderRadius: 10,
  },

  amountConvertText: {textAlign: 'center', color: '#fff'},

  converBtnContainer: {alignItems: 'center', marginTop: 60, opacity: 0.8},
});
