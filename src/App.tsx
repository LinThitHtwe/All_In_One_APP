import React from 'react';
import RootStackNavigator from './navigations/RootStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import BottomNavigationBar from './components/BottomNavigationBar';
import BottomTabNavigator from './navigations/BottomTabNavigator';
import {Provider} from 'react-redux';
import store from './redux/app/store';

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
      <Provider store={store}>
        <NavigationContainer>
          <RootStackNavigator />

          {/* <BottomNavigationBar /> */}
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
};
export default App;
