import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
// import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { ThemeManager } from './components/ThemeManager'

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  // const [location, setLocation] = React.useState(useColorScheme());
  // React.useEffect(() => {
  //   setLocation ('dark')
  // }, [])
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppearanceProvider>
            <Navigation colorScheme={colorScheme} />
        </AppearanceProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
