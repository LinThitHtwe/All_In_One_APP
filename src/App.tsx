import React from 'react';
import RootStackNavigator from './navigations/RootStackNavigator';
import {NavigationContainer} from '@react-navigation/native';

type Props = {};

const App = (props: Props) => {
  return (
    <>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
