import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {RootStackScreenProps} from '../navigations/types';
import {z} from 'zod';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useQuery} from '@tanstack/react-query';
import {getCurrencies} from '../api/apiFunctions';

interface Props extends RootStackScreenProps<'CurrencyConverter'> {}

type FormField = z.infer<typeof schema>;
type RenderPickersParams = {
  renderPickers: (
    setMethod: (value: string | ((prevValue: string) => string)) => void,
    text: string,
    values: string[],
    selectedValue: string,
  ) => React.JSX.Element;
};

const schema = z.object({
  amount: z.string({required_error: 'Amount Cannot be Blank'}).refine(
    data => {
      const numericValue = parseFloat(data.replace(/,/g, ''));
      return !isNaN(numericValue) && numericValue > 0;
    },
    {
      message: 'Amount must be greater than 0',
    },
  ),
});

const CurrencyConverter = ({navigation}: Props) => {
  const [fromValue, setFromValue] = useState<string[]>([]);
  const [toValue, setToValue] = useState<string[]>([]);
  const [selectedFromValue, setSelectedFromValue] = useState<string>('');
  const [selectedToValue, setSelectedToValue] = useState<string>('');
  const {
    data: responseData,
    isLoading: isCurrencyLoading,
    isError: isCurrencyFetchError,
  } = useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies,
  });

  useEffect(() => {
    if (responseData) {
      const currencyNames = Object.keys(responseData.data.data);
      setFromValue(currencyNames);
      setToValue(currencyNames);
      setSelectedFromValue(currencyNames[0]);
      setSelectedToValue(currencyNames[0]);
    }
  }, [responseData]);

  const form = useForm<FormField>({resolver: zodResolver(schema)});
  const {control, handleSubmit, formState} = form;
  const {errors} = formState;

  const onSubmit: SubmitHandler<FormField> = data => {
    const fromValueRate = responseData?.data.data[selectedFromValue];
    const toValueRate = responseData?.data.data[selectedToValue];
    const conversionRate = toValueRate / fromValueRate;
    const convertedAmount = (Number(data.amount) * conversionRate).toFixed(5);
    Alert.alert(
      'Conversion Value',
      `The Result of ${
        data.amount
      } ${selectedFromValue} to ${selectedToValue} is ${convertedAmount} ${selectedToValue}.\n
The Rate is 1 ${selectedFromValue} = ${conversionRate.toFixed(
        5,
      )} ${selectedToValue}.`,

      [
        {text: 'Back to Home', onPress: () => navigation.goBack()},
        {text: 'Try more', onPress: () => {}},
      ],
      {cancelable: false},
    );
  };

  const renderPickers: RenderPickersParams['renderPickers'] = (
    setMethod,
    text,
    values,
    selectedValue,
  ) => {
    return (
      <>
        <Text style={styles.optionBoxText}>{text}</Text>
        {responseData && values && Array.isArray(values) && (
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => setMethod(itemValue)}
            style={styles.optionBox}>
            {values.map((value: string, index: number) => (
              <Picker.Item label={value} key={index} value={value} />
            ))}
          </Picker>
        )}

        {isCurrencyLoading && (
          <Text
            style={{
              fontSize: 20,
            }}>
            Loading...
          </Text>
        )}

        {isCurrencyFetchError && (
          <Text
            style={{
              fontSize: 20,
              color: '#15212F',
            }}>
            Something Went Wrong
          </Text>
        )}
      </>
    );
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.mainContainer}>
      <View style={styles.bodyCard}>
        <Text
          onPress={() => navigation.goBack()}
          style={{
            color: '#15212F',
            fontSize: 13,
            fontWeight: '600',
            marginBottom: 8,
          }}>
          Back
        </Text>
        <Text style={styles.titleText}>Currency Converter</Text>
        {renderPickers(
          setSelectedFromValue,
          'From',
          fromValue,
          selectedFromValue,
        )}
        {renderPickers(setSelectedToValue, 'To', toValue, selectedToValue)}
        <View style={{marginTop: 20}}>
          <Controller
            control={control}
            name="amount"
            render={({
              field: {value, onChange, onBlur},
              fieldState: {error},
            }) => (
              <>
                <Text style={styles.amountInputLabel}>Amount:</Text>
                <TextInput
                  value={value}
                  onBlur={onBlur}
                  style={styles.amountInput}
                  inputMode="decimal"
                  placeholder="Amount to Convert"
                  placeholderTextColor={'rgba(21, 33, 47, 0.3)'}
                  onChangeText={text => {
                    const cleanedText = text.replace(/[^0-9.]/g, '');
                    onChange(cleanedText);
                  }}
                />
                {Object.keys(errors).length !== 0 && (
                  <Text style={{color: '#FF0000', padding: 10, fontSize: 16}}>
                    {errors.amount?.message}
                  </Text>
                )}
              </>
            )}
          />

          <View style={styles.converBtnContainer}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={styles.amountConvertBtn}>
              <Text style={styles.amountConvertText}>Convert</Text>
            </TouchableOpacity>
          </View>
          <Text style={{textAlign: 'center', color: '#15212F'}}>
            Selected From Value: {selectedFromValue}
          </Text>

          <Text style={{textAlign: 'center', color: '#15212F'}}>
            Selected To Value: {selectedToValue}
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
