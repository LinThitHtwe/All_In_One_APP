import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamsList = {
  HomeScreen: undefined;
  UnitConvertLists: undefined;
  CurrencyConverter: undefined;
  AllToDosList: undefined;
  ToDoForm:
    | undefined
    | {
        id: string;
        title: string;
        description: string | null;
        selectedDate: string | null;
        selectedTime: string | null;
      };
};

export type RootStackScreenProps<T extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, T>;
