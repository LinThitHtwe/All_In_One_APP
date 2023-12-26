import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from './types';
import HomeScreen from '../screens/HomeScreen';
import UnitConvertListsScreen from '../screens/UnitConvertListsScreen';
import CurrencyConverterScreen from '../screens/CurrencyConverterScreen';
import AllToDosListScreen from '../screens/AllToDosListScreen';
import ToDoFromScreen from '../screens/ToDoFromScreen';
import BlogHomeScreen from '../screens/BlogHomeScreen';
import AddBlogFormScreen from '../screens/AddBlogFormScreen';
import BlogDetail from '../screens/BlogDetail';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const RootStackNavigator = () => {
  const routeNames = ['HomeScreen', 'BlogHomeScreen', 'AddBlogFormScreen'];
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
      <Stack.Screen
        name={'CurrencyConverter'}
        component={CurrencyConverterScreen}
      />
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      <Stack.Screen name={'AllToDosList'} component={AllToDosListScreen} />
      <Stack.Screen name={'ToDoForm'} component={ToDoFromScreen} />
      <Stack.Screen name={'BlogHomeScreen'} component={BlogHomeScreen} />
      <Stack.Screen name={'AddBlogFormScreen'} component={AddBlogFormScreen} />
      <Stack.Screen
        name={'UnitConvertLists'}
        component={UnitConvertListsScreen}
      />
      <Stack.Screen name={'BlogDetail'} component={BlogDetail} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
