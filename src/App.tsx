import React from 'react';
import RootStackNavigator from './navigations/RootStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import BottomNavigationBar from './components/BottomNavigationBar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryDelay: 1000 * 60,
      retryOnMount: true,
      refetchOnReconnect: true,
    },
  },
});

const App = () => {
  // const navigation = useNavigation();
  // const routeNames = ['HomeScreen', 'BlogHomeScreen', 'SettingScreen'];

  // // Access the current screen name
  // const currentScreenName = navigation.getCurrentRoute().name;

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <>
          <RootStackNavigator />
          <BottomNavigationBar />
        </>
      </NavigationContainer>
    </QueryClientProvider>
  );
};
export default App;
