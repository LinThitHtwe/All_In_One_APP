import React from 'react';
import RootStackNavigator from './navigations/RootStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

type Props = {};

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

const App = (props: Props) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
};

export default App;
