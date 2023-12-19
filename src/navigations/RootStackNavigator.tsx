import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from './types';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamsList>();
const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
