import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from './types';
import HomeScreen from '../screens/HomeScreen';
import UnitConvertListsScreen from '../screens/UnitConvertListsScreen';
import CurrencyConverterScreen from '../screens/CurrencyConverterScreen';
import AllToDosListScreen from '../screens/AllToDosListScreen';
import ToDoFromScreen from '../screens/ToDoFromScreen';

const Stack = createNativeStackNavigator<RootStackParamsList>();
const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
      <Stack.Screen
        name={'CurrencyConverter'}
        component={CurrencyConverterScreen}
      />
      <Stack.Screen name={'AllToDosList'} component={AllToDosListScreen} />
      <Stack.Screen name={'ToDoForm'} component={ToDoFromScreen} />
      <Stack.Screen
        name={'UnitConvertLists'}
        component={UnitConvertListsScreen}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
