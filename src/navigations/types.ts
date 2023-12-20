import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamsList = {
  HomeScreen: undefined;
  UnitConvertLists: undefined;
  CurrencyConverter: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, T>;
