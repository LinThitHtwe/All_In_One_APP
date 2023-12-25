import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from './types';
import HomeScreen from '../screens/HomeScreen';
import UnitConvertListsScreen from '../screens/UnitConvertListsScreen';
import CurrencyConverterScreen from '../screens/CurrencyConverterScreen';
import AllToDosListScreen from '../screens/AllToDosListScreen';
import ToDoFromScreen from '../screens/ToDoFromScreen';
import BlogHomeScreen from '../screens/BlogHomeScreen';
import SettingScreen from '../screens/SettingScreen';
import BottomNavigationBar from '../components/BottomNavigationBar';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const RootStackNavigator = () => {
  const routeNames = ['HomeScreen', 'BlogHomeScreen', 'SettingScreen'];
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
      <Stack.Screen name={'BlogHomeScreen'} component={BlogHomeScreen} />
      <Stack.Screen name={'SettingScreen'} component={SettingScreen} />
      <Stack.Screen
        name={'UnitConvertLists'}
        component={UnitConvertListsScreen}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
