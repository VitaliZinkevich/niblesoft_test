import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { AppearanceProvider, /*useColorScheme*/ } from 'react-native-appearance'
import { Provider } from 'mobx-react';
import observableStore from './store/store';
export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppearanceProvider>
          <Provider observableStore={observableStore}>
              <Navigation />
          </Provider>
        </AppearanceProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
