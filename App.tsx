import React from 'react';

import { Routes } from './src/routes';
import { Background } from './src/components/Background';
import { AuthProvider } from './src/hooks/auth';

import { useFonts } from 'expo-font';
import { 
  Inter_400Regular, Inter_500Medium 
} from '@expo-google-fonts/inter';
import { 
  Rajdhani_700Bold, Rajdhani_500Medium 
} from '@expo-google-fonts/rajdhani';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'react-native';

export default function App() {
  const [fontsloaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold,
  })

  if(!fontsloaded) {
    return <AppLoading />
  }

  return (
    <Background>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  );
}
