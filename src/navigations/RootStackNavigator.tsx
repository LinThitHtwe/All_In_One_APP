import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from './types';
import HomeScreen from '../screens/HomeScreen';
import UnitConvertLists from '../screens/UnitConvertLists';
import CurrencyConverter from '../screens/CurrencyConverter';
import AllToDosList from '../screens/AllToDosList';
import ToDoFrom from '../screens/ToDoFrom';

const Stack = createNativeStackNavigator<RootStackParamsList>();
const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
      <Stack.Screen name={'CurrencyConverter'} component={CurrencyConverter} />
      <Stack.Screen name={'AllToDosList'} component={AllToDosList} />
      <Stack.Screen name={'ToDoForm'} component={ToDoFrom} />
      <Stack.Screen name={'UnitConvertLists'} component={UnitConvertLists} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
