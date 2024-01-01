import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {RootStackScreenProps} from '../navigations/types';
import {z} from 'zod';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useQuery} from '@tanstack/react-query';
import {getCurrencies} from '../api/apiFunctions';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppSelector} from '../redux/app/hook';

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

const CurrencyConverterScreen = ({navigation}: Props) => {
  const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
  const [fromValue, setFromValue] = useState<string[]>([]);
  const [toValue, setToValue] = useState<string[]>([]);
  const [selectedFromValue, setSelectedFromValue] = useState<string>('');
  const [selectedToValue, setSelectedToValue] = useState<string>('');
  const {
    data: responseData,
    isLoading: isCurrencyLoading,
    isError: isCurrencyFetchError,
    refetch,
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
        <Text
          style={{
            color: isDarkTheme ? '#F4F6F4' : '#090B09',
            marginTop: 30,
            marginBottom: 20,
            fontSize: 20,
          }}>
          {text}
        </Text>
        {responseData && values && Array.isArray(values) && (
          <Picker
            selectedValue={selectedValue}
            onValueChange={itemValue => setMethod(itemValue)}
            style={{
              backgroundColor: isDarkTheme ? '#435653' : '#A9BCB9',
              color: '#F7F9F7',
              fontWeight: '400',
            }}>
            {values.map((value: string, index: number) => (
              <Picker.Item label={value} key={index} value={value} />
            ))}
          </Picker>
        )}
      </>
    );
  };

  return (
    <Pressable
      onPress={() => Keyboard.dismiss()}
      style={{
        flex: 1,
        backgroundColor: isDarkTheme ? '#070907' : '#F6F8F6',
        position: 'relative',
        alignItems: 'center',
        padding: 8,
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 34,
          left: 18,
          zIndex: 10,
        }}>
        <Icon
          style={{
            fontSize: 20,
            color: '#708F70',
            opacity: 0.8,
          }}
          name="arrow-left"></Icon>
      </TouchableOpacity>

      <Icon
        style={{
          position: 'absolute',
          fontSize: 300,
          color: '#708F70',
          bottom: -160,
          left: -128,
          opacity: 0.4,
          transform: [{rotate: '45deg'}],
        }}
        name="money"></Icon>
      <Text
        style={{
          textAlign: 'center',
          color: '#708F70',
          fontSize: 28,
          fontWeight: '800',
          letterSpacing: 3,
          marginTop: 20,
        }}>
        Currency Converter
      </Text>
      {responseData && !isCurrencyFetchError && !isCurrencyLoading && (
        <View style={{height: 400, width: '100%', marginTop: 40, padding: 10}}>
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
                  <Text
                    style={{
                      color: isDarkTheme ? '#F4F6F4' : '#090B09',
                      marginVertical: 20,
                      fontSize: 20,
                    }}>
                    Amount:
                  </Text>
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    style={{
                      borderBottomWidth: 1,
                      borderColor: isDarkTheme
                        ? 'rgba(112, 143, 112,0.6)'
                        : 'rgba(9, 11, 9,0.2)',
                      color: '#090B09',
                      fontSize: 20,
                    }}
                    inputMode="decimal"
                    placeholder="Amount to Convert"
                    placeholderTextColor={'rgba(169, 188, 185, 0.6)'}
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
          </View>
          <View style={{alignItems: 'center', marginTop: 60}}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: '#708F70',
                padding: 10,
                paddingVertical: 13,
                width: '90%',
                borderRadius: 10,
              }}
              disabled={isCurrencyLoading || isCurrencyFetchError}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#F7F9F7',
                  fontSize: 18,
                  fontWeight: '800',
                }}>
                Convert
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {isCurrencyLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            height: 350,
            width: 400,
          }}>
          <ActivityIndicator size={80} color={'#A9BCB9'} />
        </View>
      )}
      {isCurrencyFetchError && (
        <View
          style={{
            flex: 1,
            height: 350,
            width: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#090B09',
              textAlign: 'center',
              fontSize: 20,
              marginBottom: 40,
            }}>
            Something Went Wrong :(
          </Text>
          <TouchableOpacity
            onPress={() => refetch()}
            style={{
              padding: 13,
              borderColor: 'rgba(112, 143, 112,0.8)',
              borderWidth: 1,
              width: '60%',
              marginBottom: 120,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: '#090B09',
                textAlign: 'center',
                fontWeight: '500',
              }}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Pressable>
  );
};

export default CurrencyConverterScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F6F8F6',
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
    fontFamily: 'monospace',
  },

  optionBoxText: {
    fontSize: 20,
    color: '#15212F',
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 20,
    fontFamily: 'monospace',
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
    fontFamily: 'monospace',
  },

  amountInput: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 15,
    color: '#15212F',
    fontFamily: 'monospace',
  },

  amountConvertBtn: {
    backgroundColor: '#15212F',
    padding: 10,
    paddingVertical: 13,
    width: '35%',
    borderRadius: 10,
  },

  amountConvertText: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'monospace',
  },

  converBtnContainer: {alignItems: 'center', marginTop: 60, opacity: 0.8},
});
