import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeContextProvider } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    "albert-sans": require('../assets/fonts/AlbertSans-Regular.ttf'),
  });
  const queryClient = new QueryClient();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeContextProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>

          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen 
              name="index" 
              options={{ 
                headerBackVisible: false, 
                headerShown: true, 
                title: "Fitmё🤳", 
                headerTitleStyle: { 
                  fontFamily: "albert-sans", 
                  fontSize: 30, 
                  fontWeight: "semibold" 
                } 
              }} 
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style='auto'/>
        </QueryClientProvider>

      </SafeAreaProvider>
    </ThemeContextProvider>
  );
}
